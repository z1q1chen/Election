import { Table, 
    // Tag,
     Space, Tooltip } from 'antd';
import pieChart from './pieChart'

function elections() {
const columns = [
  {
    title: 'Election Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
    // onclick: ()=>(pieChart),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    ellipsis: {
        showTitle: false,
      },
    render: description => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
      ),
  },
  {
    title: 'Votes Cast',
    dataIndex: 'votes',
    key: 'votes',
  },
//   {
//     title: 'Tags',
//     key: 'tags',
//     dataIndex: 'tags',
//     render: tags => (
//       <>
//         {tags.map(tag => {
//           let color = tag.length > 5 ? 'geekblue' : 'green';
//           if (tag === 'loser') {
//             color = 'volcano';
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     ),
//   },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>End</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'Best restaurant',
    description: 'This is an election about the best restaurants in Toronto',
    votes: 23,
    state: 'In progress',
  },
  {
    key: '2',
    name: 'Best bookstore',
    description: 'This is an election about the best bookstores in Toronto',
    votes: 14,
    state: 'In progress',
  },
  {
    key: '3',
    name: 'Best supermarket',
    description: 'This is an election about the best supermarkets in Toronto',
    votes: 123,
    state: 'Ended',
  },
];

return (<Table columns={columns} dataSource={data} />);
}

// return (<Table columns={columns} dataSource={data} onRow={(record) => ({
//     onClick: () => { pieChart(record.key); }
// })}/>);
// }

export default elections