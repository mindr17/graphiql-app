'use client';

import { Button } from '@nextui-org/react';
import { useState } from 'react';

import { useAppSelector } from '@/store/store-hooks';

// import styles from './explorer-result.module.css';

const DocsSchema = () => {
  const { docs } = useAppSelector((store) => store.docs);

  const [selectedType, setSelectedType] = useState<string | null>(
    null
  );

  const queryType = docs ? docs.getQueryType() : null;

  if (!queryType) return null;

  const fields = queryType.getFields();

  return (
    <div>
      {selectedType ? (
        <>
          <Button onClick={() => setSelectedType(null)}>
            {'< Back'}
          </Button>
          <h3>{selectedType}</h3>
          <p>{fields[selectedType].description}</p>
          <div>
            <span>{'Type:'}</span>
            <span>{fields[selectedType].type.toString()}</span>
          </div>
          <h4>Arguments</h4>
          <ul>
            {fields[selectedType].args.map((arg) => (
              <li key={arg.name}>
                <span>{arg.name}</span>:{' '}
                <span>{arg.type.toString()}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>
          <h3>Fields:</h3>
          <ul>
            {Object.values(fields).map((field) => (
              <li key={field.name}>
                <button onClick={() => setSelectedType(field.name)}>
                  {field.name}
                </button>
                <span>
                  ({field.args.map((arg) => arg.name).join(', ')})
                </span>
                : <span>{field.type.toString()}</span>
                <br />
                {field.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocsSchema;
