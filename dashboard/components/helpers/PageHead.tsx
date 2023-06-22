import Head from 'next/head'


type Props = {
    title: string,
}

export default function PageHead ({title}: Props) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
    )
}
