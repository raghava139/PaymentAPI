// pages/index.js
import request from 'request';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    handleGet(req, res);
  } else if (req.method === 'POST') {
    handlePost(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

async function handleGet(req, res) {
  res.status(200).json({ message: 'GET request handled' });
}

async function handlePost(req, res) {
  const data = {
    amount: req.body.amount,
    source: req.body.source,
    currency: 'usd',
  };

  // Post a charge from merchant server to clover server with api auth token
  request.post(
    'https://scl-sandbox.dev.clover.com/v1/charges',
    {
      json: data,
      headers: {
        "accept": "application/json",
        "authorization": "Bearer 556fb282-1c3c-8afc-232c-8da96860b816",
        "content-type": "application/json",
        "x-forwarded-for": "43XXB9T95PBSR"
      },
    },
    (error, response, body) => {
      if (error) {
        res.status(500).json({ error: 'Failed to process the charge' });
        return;
      }
      res.json(body);
    }
  );
}
