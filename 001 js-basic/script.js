// arrays and objs
// fucntions return
// async js

//! functions are objects in JS

const infoArea = document.getElementById("info");

const arr = [1, 2, 3, 4, 5, "hey", true, function () {}, [false]];

// &  Arrays
// for each , map , filter , find , indexOf

arr.forEach((eleme) => {
  infoArea.innerHTML += eleme + "<br>";
});

const mappedArr = arr.map((elem) => (infoArea.innerHTML += elem + "<br>"));

const filteredArr = arr.filter((elem) => {
  if (elem > 3) return true;
});

const findArr = arr.find((val) => {
  if (val === 2) return val;
});

// const indexOfArr = arr.indexOf(2);

// &  Objects

const obj = {
  name: "ishak",
  age: 19,
  country: "India",
  city: "Bodeli",
  hobby: ["gaming"],
  isMarried: false,
  getInfo() {
    return `name : ${this.name} , age : ${this.age}`;
  },
};

const info = obj.getInfo();
console.log(info);

const randomUser = async () => {
  const blob = await fetch(`https://randomuser.me/api/`);
  const blobJson = await blob.json();

  console.log(blobJson);
};

randomUser();
