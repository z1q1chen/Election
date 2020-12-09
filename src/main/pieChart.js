import { Pie, yuan } from 'ant-design-pro/lib/Charts';
function pieChart() {
const salesPieData = [
  {
    x: '家用电器',
    y: 4544,
  },
  {
    x: '食用酒水',
    y: 3321,
  },
  {
    x: '个护健康',
    y: 3113,
  },
  {
    x: '服饰箱包',
    y: 2341,
  },
  {
    x: '母婴产品',
    y: 1231,
  },
  {
    x: 'key',
    y: 1231,
  },
];

return (
  <Pie
    hasLegend
    title="销售额"
    subTitle="销售额"
    total={() => (
      <span
        dangerouslySetInnerHTML={{
          __html: yuan(salesPieData.reduce((pre, now) => now.y + pre, 0)),
        }}
      />
    )}
    data={salesPieData}
    valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
    height={294}
  />);
}

export default pieChart