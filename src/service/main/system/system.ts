import  wpRequest  from "../../index"
export function getPageListData(url: string, queryInfo: any) {
  return wpRequest.post({
    url: url,
    data: queryInfo
  })
}
