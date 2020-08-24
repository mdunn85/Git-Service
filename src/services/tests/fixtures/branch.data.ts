import { BranchDto } from '@/services/dtos/branch.dto'

const mockBranchData: [BranchDto] = [
    {
        name: "master",
        commit: {
            sha: "c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc",
            url: "https://api.github.com/repos/octocat/Hello-World/commits/c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc"
        },
        protected: true,
        protection: {
            enabled: true,
            required_status_checks: {
                enforcement_level: "non_admins",
                contexts: [
                    "ci-test",
                    "linter"
                ]
            }
        },
        protection_url: "https://api.github.com/repos/octocat/hello-world/branches/master/protection"
    }
]

export { mockBranchData }