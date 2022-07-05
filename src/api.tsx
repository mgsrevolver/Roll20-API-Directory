const APIkey = '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'
const allModsURL =
  'https://api.github.com/repos/Roll20/roll20-api-scripts/contents/'

export interface AllModsList {
  name: string
  type: string
}

export interface MoreInformation {
  content: string
}

export async function fetchAllModsList(): Promise<AllModsList> {
  const res = await fetch(allModsURL, {
    method: 'GET',
    headers: {
      Authorization: APIkey,
    },
  })

  const allModsListData: AllModsList = await res.json()
  return allModsListData
}

export async function fetchMoreInformation(
  mod: string
): Promise<MoreInformation> {
  const res = await fetch(
    `https://api.github.com/repositories/28607958/contents/${mod}/README.md`,
    {
      method: 'GET',
      headers: {
        Authorization: APIkey,
      },
    }
  )

  const moreInfoData: MoreInformation = await res.json()
  return moreInfoData
}
