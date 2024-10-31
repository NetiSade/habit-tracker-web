export type Person = {
  id: number;
  name: string;
  age: number;
};

type ListProps = {
  list: Person[];
  category: string;
};

const PersonList = ({ list, category }: ListProps) => {
  const listItems = list.map((item) => (
    <li key={item.id}>
      Name: <b>{item.name}</b> | Age: {item.age}
    </li>
  ));

  return list.length ? (
    <>
      <h3 className="list-category">{category}</h3>
      <ol className="list-items">{listItems}</ol>
    </>
  ) : null;
};

export default PersonList;
