
type IFormType = 'input' | 'password' | 'select' | 'datepicker'
//传入配置的数据类型
export interface IFormItem {
  field: string,
  type: IFormType,    //标签类型
  label: string,  //表单label
  rules?: any[],
  placeholder: any,
  options?: any, //针对select
  // 针对特殊的属性
  otherOptions?: any
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout: any
  itemLayout: any
}

