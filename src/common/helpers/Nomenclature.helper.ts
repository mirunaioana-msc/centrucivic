export interface ISelectData {
  value: any;
  label: string;
}

export const mapItemToSelect = (item: any): ISelectData => ({
  value: item?.id,
  label: item.name,
});

export const mapSelectToValue = (item: any) => item.value;