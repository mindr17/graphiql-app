'use client';

import { Button } from '@nextui-org/react';
import { GraphQLObjectType } from 'graphql';
import { useState } from 'react';

import { useAppSelector } from '@/store/store-hooks';

import styles from './docs-schema.module.scss';

interface FieldTypeState {
  field: string;
  type: string;
}

const DocsSchema = () => {
  const { docs } = useAppSelector((store) => store.docs);

  const [field, setField] = useState<string | null>(null);
  const [fieldType, setFieldType] = useState<FieldTypeState | null>(
    null
  );

  const queryType = docs ? docs.getQueryType() : null;

  if (!queryType) return null;

  const fields = queryType.getFields();

  if (field) {
    return (
      <section>
        <Button
          size='sm'
          radius='sm'
          variant='ghost'
          onClick={() => setField(null)}
        >{`⇦ Fields`}</Button>

        <h3>{field}</h3>
        <p>{fields[field].description}</p>
        <div>
          <span>{'Type:'}</span>
          <span>{fields[field].type.toString()}</span>
        </div>
        <h4>Arguments</h4>
        <ul>
          {fields[field].args.map((arg) => (
            <li key={arg.name}>
              <span>{arg.name}</span>:{' '}
              <span>{arg.type.toString()}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (fieldType) {
    const item = fields[fieldType.field].type as GraphQLObjectType;

    const ItemFields = () => {
      const arr = [];

      const itemFields = item.getFields();

      for (const property in itemFields) {
        arr.push(
          <li key={itemFields[property].name}>
            <span>{itemFields[property].name}:</span>
            <p>{itemFields[property].description}</p>
          </li>
        );
      }

      return arr;
    };

    return (
      <section>
        <Button
          size='sm'
          radius='sm'
          variant='ghost'
          onClick={() => {
            setField(fieldType.field);
            setFieldType(null);
          }}
        >
          {`⇦ ${fieldType.field}`}
        </Button>

        <h3>{item.name}</h3>
        <p>{item.description}</p>

        <div>
          <span>{'Type:'}</span>
          <span>{fields[fieldType.field].type.toString()}</span>
        </div>

        <h4>Fields:</h4>

        <ul>{ItemFields()}</ul>
      </section>
    );
  }

  return (
    <section>
      <h3>Fields:</h3>

      <ul className={styles.menu}>
        {Object.values(fields).map((field) => (
          <li className={styles.menuItem} key={field.name}>
            <h4
              className={styles.menuItemTitle}
              onClick={() => setField(field.name)}
            >
              <span>{field.name}</span> {'('}
            </h4>
            <ul>
              {field.args.map((arg) => {
                return (
                  <li className={styles.argsItem} key={arg.name}>
                    <span className={styles.argsItemName}>
                      {arg.name}:
                    </span>{' '}
                    <span className={styles.argsItemType}>
                      {arg.type.toString() || ''}
                    </span>
                  </li>
                );
              })}
            </ul>
            {'):  '}
            <span
              className={styles.menuItemType}
              onClick={() => {
                setField(null);
                setFieldType({
                  field: field.name,
                  type: field.type.toString(),
                });
              }}
            >
              {field.type.toString()}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DocsSchema;
