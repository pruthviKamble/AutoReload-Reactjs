
interface Environment {
    VERSION_CHECK_URL: string,
    production: boolean
}

const Environment: Environment = {
    production: true,
    VERSION_CHECK_URL : "../version.json"
}

export default Environment
