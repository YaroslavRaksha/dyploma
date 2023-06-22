
type Props = {
    error: object,
    router: object,
}

export default async function handleErrorClient ({ error, router }: Props ) {
    const { status, errorMessage } = error;

    if(status === 401 || errorMessage === 'Missing authorization header') {
        await router.replace('/')
    }
}
