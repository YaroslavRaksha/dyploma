const getError = require("../utils/getError");
const axios = require("axios");
const { decrypt } = require("../utils/encryption");
const { getRedisHash } = require("../utils/redisUtils");


const queryByCollectionHandle  = `
    query AllProducts($handle: String!, $first: Int) {
      collection(handle: $handle) {
        handle
        products(first: $first) {
          edges {
            node {
              id
              title
              variants(first: 1) {
                edges {
                  node {
                    priceV2 {
                      amount
                      currencyCode
                    }
                    compareAtPriceV2 {
                      amount
                      currencyCode
                    }
                    quantityAvailable
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              images(first: 1) {
                edges {
                  node {
                    originalSrc: transformedSrc(maxWidth: 800)
                  }
                }
              }
            }
          }
        }
      }
    }
`;

const getProductsByStoreIdControllerService = async ({ storeId, handle }) => {

    const { accessToken } = await getRedisHash(`store:${storeId}`, ['accessToken']);
    const decryptedAccessToken = decrypt(accessToken);


    if(!accessToken) {
        throw getError('rest', 400, 'Bad request. No data found');
    }

    try {
        const { data } = await axios({
            method: 'POST',
            url: 'https://e2bdb2-2.myshopify.com/api/2022-10/graphql.json',
            headers: {
                "Content-Type": "application/json",
                "x-shopify-storefront-access-token": decryptedAccessToken,
            },
            data: {
                query: queryByCollectionHandle,
                variables: {
                    handle: handle,
                    first: 20,
                }
            }
        });

        const products = data?.data?.collection?.products?.edges;

        if(!products) {
            throw getError('rest', 404, 'Products were not found for this collection handle.')
        }

        const simplifiedProducts = products.map(({ node }) => {
            const variant = node.variants.edges[0].node;
            return {
                id: node.id,
                title: node.title,
                images: node.images.edges.map(({ node }) => node.originalSrc),
                price: variant.priceV2.amount,
                compareAtPrice: variant.compareAtPriceV2 ? variant.compareAtPriceV2.amount : null,
                currencyCode: variant.priceV2.currencyCode,
                availability: variant.quantityAvailable,
            };
        });

        return {
            products: simplifiedProducts,
        };

    }
    catch (err) {

        if(err?.error) {
            const { status, message } = err.error;
            throw getError('rest', status, message)
        }

        throw getError('rest', 500, 'Error at retrieving products for collection handle.')

    }



}

module.exports = {
    getProductsByStoreIdControllerService,
}
