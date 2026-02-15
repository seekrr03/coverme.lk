import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const formData = await request.json();

        // Create a transporter using Gmail (or configure for your SMTP provider)
        // Note: For Gmail, you need an App Password if 2FA is enabled.
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // e.g., 'your-email@gmail.com'
                pass: process.env.EMAIL_PASS, // e.g., 'your-app-password'
            },
        });

        // Format the email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'nimthakakannangara@gmail.com', // Recipient email
            subject: `New Quote Request from ${formData.fullName}`,
            text: `
New Quote Request Details:

Personal Details:
- Name: ${formData.fullName}
- NIC: ${formData.nic}
- Phone: ${formData.phone}
- Email: ${formData.email}
- Address: ${formData.address}
- Civil Status: ${formData.civilStatus}

Family Plan: ${formData.familyPlan ? 'Yes' : 'No'}
${formData.familyPlan ? `
Spouse Details:
- Name: ${formData.spouseName}
- NIC: ${formData.spouseNic}

Children (${formData.childCount}):
${formData.children.map((c: any) => `- ${c.name} (${c.dob})`).join('\n')}
` : ''}

Financial & Professional:
- Company: ${formData.company}
- Occupation: ${formData.occupation}
- Income Sources: ${formData.incomeSource1}, ${formData.incomeSource2}, ${formData.incomeSource3}
- Assets:
${formData.assets.map((a: any) => `- ${a.type}: ${a.value}`).join('\n')}

Selected Benefits:
${Object.keys(formData).filter(k => formData[k] === true && !['familyPlan'].includes(k)).join(', ')}

Additional Notes:
${formData.additionalNotes}
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Error sending email', error }, { status: 500 });
    }
}
