import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const formData = await request.json();

        // Calculate Age specifically for year 2026
        let age = 'N/A';
        if (formData.dob) {
            const birthDate = new Date(formData.dob);
            // Simple year difference for 2026
            age = (2026 - birthDate.getFullYear()).toString();
        }

        // Create a transporter using Gmail (or configure for your SMTP provider)
        // Note: For Gmail, you need an App Password if 2FA is enabled.
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'nimthakakannangara@gmail.com', // e.g., 'your-email@gmail.com'
                pass: process.env.EMAIL_PASS || 'kupu dgcd mvgc ryvx', // e.g., 'your-app-password'
            },
        });

        // Format the email content
        const mailOptions = {
            from: process.env.EMAIL_USER || 'nimthakakannangara@gmail.com',
            to: 'nimthakakannangara@gmail.com', // Recipient email
            subject: `New Quote Request from ${formData.fullName}`,
            text: `
New Quote Request Details:

Personal Details:
- Name: ${formData.fullName}
- Gender: ${formData.gender || 'Not specified'}
- Date of Birth: ${formData.dob || 'Not specified'} (Age for 2026: ${age} years)
- NIC: ${formData.nic}
- Phone: ${formData.phone}
- Email: ${formData.email}
- Address: ${formData.address}
- Civil Status: ${formData.civilStatus}

Dependent Details:
${formData.civilStatus === 'married' ? `- Spouse Occupation: ${formData.spouseOccupation || 'Not specified'}` : ''}
${formData.childCount && parseInt(formData.childCount) > 0 ? `- Children (${formData.childCount}):\n` + formData.children.map((c: any) => `  * ${c.name} (DOB: ${c.dob})`).join('\n') : '- Children: None'}

Family Plan Coverage: ${formData.familyPlan ? 'Yes' : 'No'}
${formData.familyPlan ? `
Spouse Coverage Details:
- Name: ${formData.spouseName}
- NIC: ${formData.spouseNic}
` : ''}

Financial & Professional:
- Occupation: ${formData.occupation || 'Not specified'}
- Monthly Gross Income: ${formData.monthlyIncome || 'Not specified'}

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
