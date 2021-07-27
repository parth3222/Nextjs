import React from 'react';
import { useRouter } from 'next/router';


export default function Post({ postData }) {

  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{postData.title}</h2>
      <p>{postData.body}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = ["/posts/1","/posts/2"];
  return { paths, fallback : true }
}

export async function getStaticProps({query,params}) {
  const { id } = query || params;
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);
  const postData = await res.json();
  return {
    props: {
      postData,
    },
  };
}

// Post.getInitialProps = async ({query}) => {
//     console.log('query', query)
//     const { id } = query;
//     console.log('id', id)
//     return { id };
// }

// export async function getServerSideProps({ query }) {
//   const { id } = query;
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);
//   const postData = await res.json();
//   return {
//     props: {
//       postData,
//     },
//   };
// }

// export async function getStaticProps({ query }) {
//   const { id } = query;
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);
//   const postData = await res.json();
//   return {
//     props: {
//       postData,
//     },
//   };
// }
