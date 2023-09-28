<script setup>

  //import {ref} from 'vue';
  import HomePage from './components/HomePage.vue';

</script>

<template>
  <header>
      <a href="index.html">
          <img id="logo" src="picture/icon.png" alt="Logo" width="50" height="50">
      </a>
      <nav>
          <ul id="menuclick">
              <li>
                  <a href="article.html">Article</a>
              </li>
              <li>
                  <a href="login.html">Login</a>
              </li>
          </ul>
      </nav>
  </header>

  <main>
    
    <HomePage />

  </main>

  <footer>
      <p id="footertext">All right reserved</p>
  </footer>

</template>

<style>

  body{
    background-color: white;
    color: black;
    font-family: 'Times New Roman', Times, serif;
    width: 100%;
    margin: 0px;
    margin-top: 80px;
  }

  header {
    background-color: rgb(227, 255, 190);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  footer {
    background-color: rgb(227, 255, 190);
    color: black;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }

  main{
    margin-left: 10%;
    margin-right: 10%;
  }

  article{
    margin-top: 2%;
    margin-bottom: 5%;
  }

  article h1{
    margin-left: 1%;
  }

  set {
    display: flex;
    flex-wrap: nowrap;
  }

  set #bottom{
    align-self: flex-end;
  }

  img {
    margin: 1%;
    display: block;
    max-width:300px;
    max-height:200px;
    width: auto;
    height: auto;
  }

  #menuclick {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
  }

  #menuclick li {
    margin-right: 10px;
  }

  #menuclick li:last-child {
    margin-right: 0;
  }

  #menuclick a {
    text-decoration: none;
    padding: 10px;
    border: 1px solid black;
    color: black;
    transition: color 0.2s, background-color 0.2s;
  }

  #menuclick a:hover {
    color: red;
    background-color: black;
  }

  #loginTable table td, #staticTable table td{
    border: 3px solid black;
    padding: 6px;
  }

  #logo {
    margin-right: 10px; 
  }

  #sidenav {
    position: fixed;
    left: 5px;
    top: 80px;
    width: 200px;
    padding: 20px;
  }

  #sidenav ul {
    list-style: none;
    padding: 0;
  }

  #sidenav li {
    margin-bottom: 5px;
  }

  #sidenav a {
    text-decoration: none;
    color: black;
  }

  #staticTable  tr{
    padding: 10%;
  }

  #staticTable table{
    width: 50%;
  }
</style>
