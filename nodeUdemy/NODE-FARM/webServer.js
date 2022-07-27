const http = require('http');
const url = require('url');
const fs = require('fs');
const { type } = require('os');

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

  return output;
};

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'content-type': 'text/html' });

    const cardsHtml = dataObj
      .map(ele => replaceTemplate(tempCard, ele))
      .join('');

    const output1 = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output1);
  } else if (pathname === '/product') {
    res.writeHead(200, { 'content-type': 'text/html' });
    const product = dataObj[query.id];
    const output2 = replaceTemplate(tempProduct, product);

    res.end(output2);
  } else if (pathname === '/card') {
    res.writeHead(200, { content_type: 'text/html' });
    res.end(tempCard);
  } else {
    res.end('Nothing');
  }

  // return res.end('server has ended');
});

server.listen(5500, () => {
  console.log('server is back to on web server');
});
