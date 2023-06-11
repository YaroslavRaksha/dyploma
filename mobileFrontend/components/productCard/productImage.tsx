import React, {useState} from 'react';
import ImageLoading from "../loading/ImageLoading";
import {Image} from "react-native";

type Props = {
    source: any,
};

const ProductImage: React.FC<Props> = ({ source }) => {

    const [imageLoaded, setImageLoaded] = useState<boolean>(true);

    return (
        <>
            { imageLoaded ? null : <ImageLoading /> }
            <Image
                onLoadStart={() => setImageLoaded(false)}
                onLoadEnd={() => setImageLoaded(true)}
                source={source}
                resizeMode='cover'
                style={{flex: 1, height: undefined, width: undefined }}
            />

        </>
    );
};

export default ProductImage;
