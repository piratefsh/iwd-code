
const tagName = 'food'
const promise = fetch('https://api.tumblr.com/v2/tagged?tag=' + tagName + '&api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4')
console.log(promise)

promise.then(function(response){
  return response.json()
}).then(function(data){
  console.log(data)
})


  // .then(function(response){
  //   return response.json();
  // })
  // .then(function(result){
  //   console.log(result)
  // });

// // query form
// const form = document.getElementById('query-form');

// // text input field
// const query = document.getElementById('query');

// const list = document.getElementById('list-data');

// // set onsubmit
// form.onsubmit = function(event){
//   event.preventDefault();

//   // get value in input field
//   const queryTerm = query.value;
//   console.log(queryTerm);

//   getTaggedPhotos(queryTerm);
// }

// function getTaggedPhotos(tagName){
//   fetch('https://api.tumblr.com/v2/tagged?tag=' + tagName + '&api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4')
//     .then(function(response){
//       return response.json();
//     })
//     .then(function(result){

//       // clear list
//       list.innerHTML = '';

//       const items = result.response;

//       for(let i = 0; i < items.length; i++){
//         const item = items[i];

//         if(item.photos != undefined){
//           const altSizes = item.photos[0].alt_sizes
//           const imgSrc = altSizes[altSizes.length - 3].url;

//           const img = document.createElement('img');
//           img.src = imgSrc;

//           const li = document.createElement('li');
//           li.appendChild(img);
//           // li.innerHTML = imgSrc;

//           list.appendChild(li);
//         }
//       }
//   }).catch(function(err){
//     console.log(err)
//   })
// }