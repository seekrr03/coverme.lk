import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const formData = await request.json();

        // Extract DOB and Gender from NIC
        let extractedDob = 'Not specified';
        let extractedGender = 'Not specified';
        let ageFor2026 = 'N/A';

        if (formData.nic) {
            let year = 0;
            let days = 0;
            const nicStr = formData.nic.toString().toUpperCase().replace(/[^A-Z0-9]/g, '');

            if (nicStr.length === 9 || (nicStr.length === 10 && (nicStr.endsWith('V') || nicStr.endsWith('X')))) {
                year = 1900 + parseInt(nicStr.substring(0, 2), 10);
                days = parseInt(nicStr.substring(2, 5), 10);
            } else if (nicStr.length === 12) {
                year = parseInt(nicStr.substring(0, 4), 10);
                days = parseInt(nicStr.substring(4, 7), 10);
            }

            if (year > 0 && days > 0) {
                if (days > 500) {
                    extractedGender = 'Female';
                    days -= 500;
                } else {
                    extractedGender = 'Male';
                }

                if (days >= 1 && days <= 366) {
                    const tempDate = new Date(2000, 0); // Use leap year 2000 for SL NIC logic
                    tempDate.setDate(days);
                    const month = tempDate.toLocaleString('default', { month: 'long' });
                    const date = tempDate.getDate();
                    extractedDob = `${month} ${date}, ${year}`;
                    // Calculate Age specifically for year 2026
                    ageFor2026 = (2026 - year).toString();
                }
            }
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

        // Format Selected Benefits List
        const formatScope = (scope: string) => scope === 'local' ? '(Local Coverage Only)' : '(Worldwide Coverage)';

        const benefitsList = Object.keys(formData)
            .filter(k => formData[k] === true && !['familyPlan', 'globalHospital', 'criticalIllness', 'criticalIllnessSpouse', 'hospitalizationSelf', 'hospitalizationPerDay'].includes(k));

        if (formData.globalHospital) benefitsList.push(`Hospital Cover ${formatScope(formData.hospitalCoverScope)}`);
        if (formData.criticalIllness) benefitsList.push(`Critical Illness (You) ${formatScope(formData.criticalIllnessScope)}`);
        if (formData.criticalIllnessSpouse) benefitsList.push(`Critical Illness (Spouse) ${formatScope(formData.criticalIllnessSpouseScope)}`);
        if (formData.hospitalizationSelf) benefitsList.push(`Hospitalization (You) ${formatScope(formData.hospitalizationSelfScope)}`);
        if (formData.hospitalizationPerDay) benefitsList.push(`Hospitalization (Spouse/Children) ${formatScope(formData.hospitalizationPerDayScope)}`);

        // Format the email content
        const mailOptions = {
            from: process.env.EMAIL_USER || 'nimthakakannangara@gmail.com',
            to: 'nimthakakannangara@gmail.com', // Recipient email
            subject: `New Quote Request from ${formData.fullName}`,
            text: `
New Quote Request Details:

Personal Details:
- Name: ${formData.fullName}
- Gender: ${extractedGender}
- Date of Birth: ${extractedDob} (Age for 2026: ${ageFor2026} years)
- NIC: ${formData.nic}
- Phone: ${formData.phone}
- Email: ${formData.email}
- Address: ${formData.addressLine1}${formData.addressLine2 ? ', ' + formData.addressLine2 : ''}, ${formData.city}
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
${benefitsList.length > 0 ? benefitsList.join(',\n') : 'None'}

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
