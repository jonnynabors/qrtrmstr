import { execSync } from 'child_process'

export function checkNetworkConnectivity() {
    return execSync('curl -s github.com > /dev/null')
}
