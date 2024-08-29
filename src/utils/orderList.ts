const FormatCaracter = (str: string) => {
  return str.normalize('NFD');
};

const OrderListFunction = (list: any[], key: string): any[] => {
  return list.sort((a: any, b: any) => {
    const strA = FormatCaracter(a[key]).toLowerCase();
    const strB = FormatCaracter(b[key]).toLowerCase();

    if (strA < strB) return -1;
    if (strA > strB) return 1;
    return 0;
  });
};

export default OrderListFunction;
