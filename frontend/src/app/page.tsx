'use client';

import Button from '../shared/button/button';
import styles from './page.module.css';

export default function Home() {
  return (
    <section className={styles.main}>
      <h1>Hello</h1>
      <div style={{ display: 'flex' }}>
        <Button title={'Default Button'} />
        <Button title={'Red Button'} style={'red'} />
        <Button
          title={'Green Button'}
          style={'green'}
          classes={['test-class']}
          callback={() => console.log('hello')}
        />
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Nesciunt facilis eum maxime neque, vel, possimus assumenda
        delectus quod ullam impedit saepe, consequuntur at. Quasi
        fugiat expedita minus dolorum in. Tempora. Explicabo
        voluptate, autem rem fuga eveniet amet consectetur nam dolores
        cumque modi. Soluta eius aliquid in amet sunt atque iure
        quasi, inventore nam nulla provident itaque, iste
        necessitatibus quas voluptate? Quis ratione deleniti ab, rem
        beatae ipsam eaque distinctio eligendi unde quisquam assumenda
        veniam aliquid velit impedit optio perferendis, fugiat sed.
        Beatae, minima? Repellat deleniti deserunt, modi impedit
        eligendi dignissimos. Delectus numquam sapiente ad saepe
        laboriosam modi culpa magni earum alias, similique maxime sint
        ea at repudiandae temporibus inventore, dolorum corporis,
        obcaecati eligendi? Obcaecati doloremque veritatis architecto,
        aut laudantium magni. Dolores expedita voluptatum voluptatibus
        delectus facere et! Dolorem, similique tempore quasi obcaecati
        consequatur laudantium! Blanditiis, libero nulla placeat sequi
        numquam ratione quidem eum adipisci animi eligendi natus
        voluptatem fugit repellendus? Error at odit doloremque non
        inventore fugiat et quae dolore necessitatibus eligendi
        praesentium provident tempore maxime recusandae eos quod in
        debitis saepe quas adipisci expedita similique, nulla
        veritatis corrupti? Quod.
      </p>
    </section>
  );
}
