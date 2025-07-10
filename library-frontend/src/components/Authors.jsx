import { ALL_AUTHORS, EDIT_AUTHOR } from "../queriesAppolo/authorQueries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import Select from 'react-select';

const EditAuthor = ({ authors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [born, setBorn] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.error('Error editing author:', error);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    if (!selectedAuthor) {
      console.error('No author selected');
      return;
    }

    console.log('edit author...');
    editAuthor({
      variables: {
        name: selectedAuthor.value,
        setBornTo: parseInt(born, 10),
      },
    });
    setSelectedAuthor(null);
    setBorn('');
  };

  const authorOptions = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  return (
    <div>
      <h2>Edit Author</h2>
      <form onSubmit={submit}>
        <div>
          Author
          <Select
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            options={authorOptions}
          />
        </div>
        <div>
          Born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Edit Author</button>
      </form>
    </div>
  );
};

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const authors = useQuery(ALL_AUTHORS).data?.allAuthors || [] 

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {authors.length > 0 && <EditAuthor authors={authors} />}
    </div>
  )
}

export default Authors
