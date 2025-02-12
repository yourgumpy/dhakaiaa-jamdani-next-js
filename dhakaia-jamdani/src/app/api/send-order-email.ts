import { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { userEmail, orderId, total, products } = req.body;

  // Configure transporter with more explicit settings
  const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    // Enhanced email content
    const userHtml = `
      <h1>Thank you for your order!</h1>
      <p>Order ID: ${orderId}</p>
      <p>Total Amount: ৳${total.toFixed(2)}</p>
      <h3>Order Details:</h3>
      <ul>
        ${products.map((p: any) => `
          <li>
            ${p.title} - 
            Quantity: ${p.quantity} - 
            Price: ৳${(p.price * p.quantity).toFixed(2)}
          </li>
        `).join('')}
      </ul>
    `;

    const adminHtml = `
      <h1>New Order Notification</h1>
      <p>Order ID: ${orderId}</p>
      <p>Customer Email: ${userEmail}</p>
      <p>Total Amount: ৳${total.toFixed(2)}</p>
      <h3>Products:</h3>
      <ul>
        ${products.map((p: any) => `
          <li>
            ${p.title} - 
            Quantity: ${p.quantity} - 
            Price: ৳${p.price}
          </li>
        `).join('')}
      </ul>
    `;

    // Send emails in parallel
    await Promise.all([
      transporter.sendMail({
        from: `"Your Store Name" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: 'Order Confirmation #' + orderId,
        html: userHtml
      }),
      transporter.sendMail({
        from: `"Store Notifications" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Order #${orderId}`,
        html: adminHtml
      })
    ]);

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Email error:', error);
    res.status(500).json({ 
      error: 'Failed to send emails',
      details: error.response ? error.response : error.message
    });
  }
}