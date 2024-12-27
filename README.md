<h1>Electronics eCommerce Shop With Admin Dashboard in Next.js and Node.js</h1>

<h2>Step-by-step video instructions for running the app</h2>

[https://www.youtube.com/watch?v=Ry0aOMws0gE](https://www.youtube.com/watch?v=Ry0aOMws0gE)

<h2>Instructions</h2>
<ol>
  <li><p>To run the app you first need to download and install Node.js and npm on your computer. Here is a link to the tutorial that explains how to install them: <a href="https://www.youtube.com/watch?v=4FAtFwKVhn0" target="_blank">https://www.youtube.com/watch?v=4FAtFwKVhn0</a>. Also here is the link where you can download them: <a href="https://nodejs.org/en" target="_blank">https://nodejs.org/en</a></p></li>
  <li><p>When you install Node.js and npm on your computer you need to download and install MySQL on your computer. Here is another link to the tutorial which explains how you can download and install MySQL on your computer: <a target="_blank" href="https://www.youtube.com/watch?v=BxdSUGBs0gM&t=212s">https://www.youtube.com/watch?v=BxdSUGBs0gM&t=212s</a>. Here is a link where you can download MySQL: <a href="https://dev.mysql.com/downloads/installer/" target="_blank">https://dev.mysql.com/downloads/installer/</a></p></li>
  <li><p>This step is optional, but highly recommended if you don't have a database management app. Because HeidiSQL is beginner-friendly and very easy to use than other database management options. Here is a link to the tutorial which explains how to download and install HeidiSQL: <a href="https://www.youtube.com/watch?v=oJ24MyLeiPs" target="_blank">https://www.youtube.com/watch?v=oJ24MyLeiPs</a> and here is a link where you can download it: <a href="https://www.heidisql.com" target="_blank">https://www.heidisql.com</a></p></li>
  <li><p>When you install all the programs you need on your computer you need to download the project. When you download the project, you need to extract it.</p></li>
  <li><p>After you extract the project you need to open the project folder in your code editor and in the root create a file with the name .env.</p></li>
  <li><p>You need to put the following code in the <b>.env file in the root folder</b> and instead of username and password put your MySQL username and password:</p></li>

```env
DATABASE_URL="mysql://username:password@localhost:3306/radiotech_nextjs"
NEXTAUTH_SECRET=12D16C923BA17672F89B18C1DB22A
NEXTAUTH_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001
```

  <li><p>After you do it, you need to create another <b>.env file in the server folder</b> and put the same DATABASE_URL you used in the previous .env file:</p></li>

```env
DATABASE_URL="mysql://username:password@localhost:3306/radiotech_nextjs"
PORT=3001
```

  <li><p>ow you need to open your terminal of choice in the root folder of the project and write:</p></li>

```
npm install
```

  <li><p>ow you need to navigate with the terminal in the server folder and install everything:</p></li>

```
cd server
npm install
```

  <li><p>You will need to run the Prisma migration now. Make sure you are in the server folder and write:</p></li>

```
npx prisma generate && npx prisma migrate dev
```

  <li><p>Next is to insert demo data. To do it you need to go to the server/utills folder and call insertDemoData.js:</p></li>

```
cd utills
node insertDemoData.js
```

  <li><p>Now you can go back to the server folder and run the backend:</p></li>

```
cd ..
node app.js
```

  <li><p>While your backend is running you need to open another terminal(don't stop the backend). In the second terminal, you need to make sure you are in your root project folder and write the following:</p></li>

```
npm run dev
```

  <li><p>Open <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> and see it live!</p></li>
</ol>

<h2>Original Author</h2>
<p>This project was created by <a href="https://github.com/Kuzma02/Electronics-eCommerce-Shop-With-Admin-Dashboard-NextJS-NodeJS" target="_blank">Kuzma02</a>.</p>
