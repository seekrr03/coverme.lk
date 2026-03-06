'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

export default function QuotePage() {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        nic: '',
        dob: '',
        address: '',
        monthlyIncome: '',
        gender: '', // male, female
        maternityBenefit: false,
        civilStatus: 'single', // single, married, separated, divorced, widowed
        spouseName: '',
        spouseDob: '',
        spouseNic: '',
        spouseOccupation: '',
        familyPlan: false,
        children: [] as { name: string; dob: string }[],
        childCount: '', // New field for simple child count input
        globalHospital: false,
        criticalIllness: false,
        criticalIllnessSpouse: false,
        additionalLife: false,
        familyIncome: false,

        hospitalizationPerDay: false, // Now effectively "Hospitalization (Spouse/Children)" in family plan
        hospitalizationSelf: false, // New: "Hospitalization for you"
        premiumProtectionSpouse: false, // New: "Premium Protection (Spouse)"
        occupation: '',

        globalCover: false,
        additionalNotes: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCivilStatusChange = (status: string) => {
        const isMarried = status === 'married';
        const hasChildrenOption = status !== 'single';

        setFormData(prev => ({
            ...prev,
            civilStatus: status,
            // Reset dependent fields if not married
            spouseName: isMarried ? prev.spouseName : '',
            spouseNic: isMarried ? prev.spouseNic : '',
            spouseOccupation: isMarried ? prev.spouseOccupation : '',
            familyPlan: isMarried ? prev.familyPlan : false,
            // Reset children info if single
            children: hasChildrenOption ? prev.children : [],
            childCount: hasChildrenOption ? prev.childCount : ''
        }));
    };

    const addChild = () => {
        setFormData(prev => ({
            ...prev,
            children: [...prev.children, { name: '', dob: '' }]
        }));
    };

    const updateChild = (index: number, field: 'name' | 'dob', value: string) => {
        const newChildren = [...formData.children];
        newChildren[index][field] = value;
        setFormData(prev => ({ ...prev, children: newChildren }));
    };

    const removeChild = (index: number) => {
        setFormData(prev => ({
            ...prev,
            children: prev.children.filter((_, i) => i !== index)
        }));
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        console.log('Sending Form Data:', formData);

        try {
            const response = await fetch('/api/quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Thank you! One of our agents will contact you shortly.');
                // Optional: Reset form here if needed
            } else {
                alert('There was an issue submitting your details. Please try again or contact us via WhatsApp.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleChildCountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(e.target.value) || 0;
        setFormData(prev => {
            const currentCount = prev.children.length;
            let newChildren = [...prev.children];

            if (count > currentCount) {
                for (let i = 0; i < count - currentCount; i++) {
                    newChildren.push({ name: '', dob: '' });
                }
            } else {
                newChildren = newChildren.slice(0, count);
            }

            return {
                ...prev,
                childCount: e.target.value,
                children: newChildren
            };
        });
    };


    return (
        <div className="min-h-screen font-sans bg-gray-50 text-[#002B5C]">
            {/* Header (Simplified for Quote Page) */}
            <header className="bg-white shadow-sm py-4">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <a href="/" className="flex items-center gap-2">
                        {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4E1686] to-[#8CC63F] flex items-center justify-center text-white font-bold text-lg">
                            L
                        </div> */}
                        <span className="text-2xl font-bold text-[#002B5C] tracking-tight">coverme.lk</span>
                    </a>
                    <a href="/" className="text-sm font-medium text-gray-600 hover:text-[#4E1686] transition">Back to Home</a>
                </div>
            </header>

            <div className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
                        <div className="bg-gray-100 py-4 px-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-[#002B5C]">Get Your Personalized Quote</h2>
                            <p className="text-sm text-gray-500">Please fill in your details below.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">

                            {/* Personal Details */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-[#4E1686] border-b pb-2 border-purple-100">Personal Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Full Name (as in NIC)</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8CC63F] focus:border-transparent outline-none transition"
                                            placeholder="e.g. Saman Perera"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">NIC Number</label>
                                        <input
                                            type="text"
                                            name="nic"
                                            required
                                            value={formData.nic}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8CC63F] outline-none transition"
                                            placeholder="NIC Number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8CC63F] outline-none transition"
                                            placeholder="07X XXXXXXX"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8CC63F] outline-none transition"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            required
                                            value={formData.dob}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8CC63F] outline-none transition"
                                        />
                                    </div>
                                </div>



                                {/* Address Logic */}
                                <div className="pt-2">
                                    <div className="mt-3 animate-fade-in">
                                        <label className="block text-sm font-semibold mb-1">Current Address</label>
                                        <textarea
                                            name="address"
                                            required
                                            rows={3}
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8CC63F] outline-none transition"
                                            placeholder="Type your current address here..."
                                        ></textarea>
                                    </div>

                                    <div className="mt-5 animate-fade-in">
                                        <label className="block text-sm font-semibold mb-2">Gender</label>
                                        <div className="flex gap-6">
                                            {['male', 'female'].map((g) => (
                                                <label key={g} className="flex items-center cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value={g}
                                                        required
                                                        checked={formData.gender === g}
                                                        onChange={handleInputChange}
                                                        className="h-4 w-4 text-[#4E1686] focus:ring-[#4E1686] border-gray-300"
                                                    />
                                                    <span className="ml-2 capitalize text-gray-700">{g}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Civil Status */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-[#4E1686] border-b pb-2 border-purple-100">Civil Status</h3>
                                <div className="flex flex-wrap gap-4">
                                    {['single', 'married', 'separated', 'divorced', 'widowed'].map((status) => (
                                        <label key={status} className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="civilStatus"
                                                value={status}
                                                checked={formData.civilStatus === status}
                                                onChange={() => handleCivilStatusChange(status)}
                                                className="h-4 w-4 text-[#4E1686] focus:ring-[#4E1686] border-gray-300"
                                            />
                                            <span className="ml-2 capitalize text-gray-700">{status}</span>
                                        </label>
                                    ))}
                                </div>

                                {/* Dependent Details for Non-Single */}
                                {formData.civilStatus !== 'single' && (
                                    <div className="space-y-6 pl-4 border-l-2 border-purple-100 bg-purple-50 p-4 rounded-r-lg mt-4">

                                        {/* Spouse Occupation (Only if Married) */}
                                        {formData.civilStatus === 'married' && (
                                            <div className="mb-4 animate-fade-in">
                                                <label className="block text-sm font-semibold mb-1">Spouse's Occupation</label>
                                                <select
                                                    name="spouseOccupation"
                                                    required
                                                    value={formData.spouseOccupation}
                                                    onChange={handleInputChange}
                                                    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8CC63F] transition bg-white"
                                                >
                                                    <option value="" disabled>Select Occupation</option>
                                                    <option value="A professional">A professional</option>
                                                    <option value="Businessman">Businessman</option>
                                                    <option value="Corporate employee">Corporate employee</option>
                                                    <option value="Housewife">Housewife</option>
                                                </select>
                                            </div>
                                        )}

                                        {/* Child Count Input */}
                                        <div className="mb-4 animate-fade-in">
                                            <label className="block text-sm font-semibold mb-1">Number of Children</label>
                                            <input
                                                type="number"
                                                min="0"
                                                name="childCount"
                                                required
                                                value={formData.childCount}
                                                onChange={handleChildCountChange}
                                                className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8CC63F] transition bg-white"
                                                placeholder="0"
                                            />
                                        </div>

                                        {/* Children Details List */}
                                        {parseInt(formData.childCount) > 0 && (
                                            <div className="mb-4 animate-fade-in">
                                                <p className="text-sm font-semibold text-gray-700 mb-2">Children Details</p>
                                                {formData.children.map((child, index) => (
                                                    <div key={index} className="flex gap-2 items-end bg-white p-3 rounded shadow-sm mb-2">
                                                        <div className="flex-1">
                                                            <label className="text-xs text-gray-500">Child's Name</label>
                                                            <input
                                                                type="text"
                                                                required
                                                                value={child.name}
                                                                onChange={(e) => updateChild(index, 'name', e.target.value)}
                                                                className="w-full border-b border-gray-300 focus:border-[#8CC63F] outline-none px-1 py-1 text-sm"
                                                                placeholder="Name"
                                                            />
                                                        </div>
                                                        <div className="w-1/3">
                                                            <label className="text-xs text-gray-500">Date of Birth</label>
                                                            <input
                                                                type="date"
                                                                required
                                                                value={child.dob}
                                                                onChange={(e) => updateChild(index, 'dob', e.target.value)}
                                                                className="w-full border-b border-gray-300 focus:border-[#8CC63F] outline-none px-1 py-1 text-sm"
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeChild(index)}
                                                            className="text-red-500 hover:text-red-700 text-sm font-bold px-2"
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={addChild}
                                                    className="text-sm text-[#8CC63F] font-semibold hover:text-[#7ab332] flex items-center gap-1"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                                    Add Child
                                                </button>
                                            </div>
                                        )}

                                        {/* Family Plan Logic (Only if Married) */}
                                        {formData.civilStatus === 'married' && (
                                            <>
                                                <div className="flex items-center mt-6">
                                                    <input
                                                        id="familyPlan"
                                                        name="familyPlan"
                                                        type="checkbox"
                                                        checked={formData.familyPlan}
                                                        onChange={handleInputChange}
                                                        className="h-5 w-5 text-[#4E1686] focus:ring-[#4E1686] border-gray-300 rounded cursor-pointer"
                                                    />
                                                    <label htmlFor="familyPlan" className="ml-3 block text-base font-bold text-[#4E1686] cursor-pointer">
                                                        Interested in a Family Plan?
                                                    </label>
                                                </div>

                                                {/* Gated Fields for Spouse */}
                                                {formData.familyPlan && (
                                                    <div className="space-y-4 animate-fade-in mt-4 border-l-2 border-purple-200 pl-4 py-2">
                                                        <p className="text-sm text-gray-500 mb-2">Since you're choosing a family plan, please provide spouse details for coverage.</p>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-sm font-semibold mb-1">Spouse Full Name</label>
                                                                <input
                                                                    type="text"
                                                                    name="spouseName"
                                                                    required
                                                                    value={formData.spouseName}
                                                                    onChange={handleInputChange}
                                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white focus:ring-2 focus:ring-[#8CC63F]"
                                                                    placeholder="Spouse Name"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-semibold mb-1">Spouse NIC</label>
                                                                <input
                                                                    type="text"
                                                                    name="spouseNic"
                                                                    required
                                                                    value={formData.spouseNic}
                                                                    onChange={handleInputChange}
                                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white focus:ring-2 focus:ring-[#8CC63F]"
                                                                    placeholder="Spouse NIC"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Riders & Benefits */}
                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <h3 className="text-lg font-medium text-[#4E1686] border-b pb-2 border-purple-100 flex items-center gap-2">
                                    Life & Health Upgrades
                                    {formData.civilStatus === 'married' && !formData.familyPlan && (
                                        <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Single Plan Mode</span>
                                    )}
                                </h3>

                                <div className="space-y-3">

                                    {/* SCENARIO A: Single OR Married (No Family Plan) */}
                                    {!formData.familyPlan && (
                                        <div className="space-y-3 animate-fade-in">

                                            {/* MANDATORY BENEFITS (Always Active for Single/Main Applicant) */}
                                            <div className="p-4 bg-gray-100 rounded-xl border border-gray-200 opacity-80 cursor-not-allowed">
                                                <div className="flex items-start gap-3">
                                                    <input type="checkbox" checked disabled className="mt-1 w-5 h-5 text-gray-500 rounded border-gray-300 bg-gray-200" />
                                                    <div>
                                                        <span className="block font-bold text-gray-700">Accidental Death Benefit</span>
                                                        <span className="text-sm text-gray-500">Ensures your loved ones receive a higher payout if the unexpected happens.</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-gray-100 rounded-xl border border-gray-200 opacity-80 cursor-not-allowed">
                                                <div className="flex items-start gap-3">
                                                    <input type="checkbox" checked disabled className="mt-1 w-5 h-5 text-gray-500 rounded border-gray-300 bg-gray-200" />
                                                    <div>
                                                        <span className="block font-bold text-gray-700">Permanent Total Disability (PTD)</span>
                                                        <span className="text-sm text-gray-500">60% paid immediately 40% in 4 annual installments.</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-gray-100 rounded-xl border border-gray-200 opacity-80 cursor-not-allowed">
                                                <div className="flex items-start gap-3">
                                                    <input type="checkbox" checked disabled className="mt-1 w-5 h-5 text-gray-500 rounded border-gray-300 bg-gray-200" />
                                                    <div>
                                                        <span className="block font-bold text-gray-700">Permanent Partial Disability (PPD)</span>
                                                        <span className="text-sm text-gray-500">% of Sum Assured paid based on disability severity.</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-gray-100 rounded-xl border border-gray-200 opacity-80 cursor-not-allowed">
                                                <div className="flex items-start gap-3">
                                                    <input type="checkbox" checked disabled className="mt-1 w-5 h-5 text-gray-500 rounded border-gray-300 bg-gray-200" />
                                                    <div>
                                                        <span className="block font-bold text-gray-700">Premium Protection Benefit</span>
                                                        <span className="text-sm text-gray-500">Waives premiums on Permanent Total Disability (Accident/Sickness).</span>
                                                    </div>
                                                </div>
                                            </div>


                                            {/* OPTIONAL BENEFITS */}

                                            {/* Global Hospital Cover */}
                                            <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors border border-transparent hover:border-purple-200">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.globalHospital}
                                                    onChange={(e) => setFormData({ ...formData, globalHospital: e.target.checked })}
                                                    className="mt-1 w-5 h-5 text-[#4E1686] rounded border-gray-300 focus:ring-[#4E1686]"
                                                />
                                                <div>
                                                    <span className="block font-bold text-[#002B5C]">Global Hospital Cover</span>
                                                    <span className="text-sm text-gray-500">Comprehensive medical coverage worldwide.</span>
                                                </div>
                                            </label>

                                            {/* Critical Illness (Self) */}
                                            <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors border border-transparent hover:border-purple-200">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.criticalIllness}
                                                    onChange={(e) => setFormData({ ...formData, criticalIllness: e.target.checked })}
                                                    className="mt-1 w-5 h-5 text-[#4E1686] rounded border-gray-300 focus:ring-[#4E1686]"
                                                />
                                                <div>
                                                    <span className="block font-bold text-[#002B5C]">Critical Illness Benefit</span>
                                                    <span className="text-sm text-gray-500">Covers 36 major illnesses including Heart Attack, Cancer, Stroke & Kidney Failure.</span>
                                                </div>
                                            </label>

                                            {/* Hospitalization (Self) - Renamed from "Hospitalization Benefits" */}
                                            <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors border border-transparent hover:border-purple-200">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.hospitalizationSelf}
                                                    onChange={(e) => setFormData({ ...formData, hospitalizationSelf: e.target.checked })}
                                                    className="mt-1 w-5 h-5 text-[#4E1686] rounded border-gray-300 focus:ring-[#4E1686]"
                                                />
                                                <div>
                                                    <span className="block font-bold text-[#002B5C]">Hospitalization Benefits</span>
                                                    <span className="text-sm text-gray-500">Daily benefit for income loss, medical bills & transport.</span>
                                                </div>
                                            </label>

                                            {/* Maternity Benefit (Female Only) */}
                                            {formData.gender === 'female' && (
                                                <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors border border-transparent hover:border-purple-200">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.maternityBenefit}
                                                        onChange={(e) => setFormData({ ...formData, maternityBenefit: e.target.checked })}
                                                        className="mt-1 w-5 h-5 text-[#4E1686] rounded border-gray-300 focus:ring-[#4E1686]"
                                                    />
                                                    <div>
                                                        <span className="block font-bold text-[#002B5C]">Maternity Benefit</span>
                                                        <span className="text-sm text-gray-500">Comprehensive coverage for pregnancy and childbirth related expenses.</span>
                                                    </div>
                                                </label>
                                            )}
                                        </div>
                                    )}

                                    {/* SCENARIO B: Married (Family Plan Active) */}
                                    {formData.familyPlan && (
                                        <div className="space-y-3 animate-fade-in">

                                            {/* MANDATORY BENEFITS (Always Active for Single/Main Applicant) */}
                                            <div className="p-4 bg-purple-100/50 rounded-xl border border-purple-100 opacity-80 cursor-not-allowed">
                                                <div className="flex items-start gap-3">
                                                    <input type="checkbox" checked disabled className="mt-1 w-5 h-5 text-[#4E1686] rounded border-[#4E1686] bg-purple-200" />
                                                    <div>
                                                        <span className="block font-bold text-[#002B5C]">Accidental Death Benefit</span>
                                                        <span className="text-sm text-gray-500">Ensures your loved ones receive a higher payout if the unexpected happens.</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-purple-100/50 rounded-xl border border-purple-100 opacity-80 cursor-not-allowed">
                                                <div className="flex items-start gap-3">
                                                    <input type="checkbox" checked disabled className="mt-1 w-5 h-5 text-[#4E1686] rounded border-[#4E1686] bg-purple-200" />
                                                    <div>
                                                        <span className="block font-bold text-[#002B5C]">Permanent Total Disability (PTD)</span>
                                                        <span className="text-sm text-gray-500">60% paid immediately 40% in 4 annual installments.</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-purple-100/50 rounded-xl border border-purple-100 opacity-80 cursor-not-allowed">
                                                <div className="flex items-start gap-3">
                                                    <input type="checkbox" checked disabled className="mt-1 w-5 h-5 text-[#4E1686] rounded border-[#4E1686] bg-purple-200" />
                                                    <div>
                                                        <span className="block font-bold text-[#002B5C]">Permanent Partial Disability (PPD)</span>
                                                        <span className="text-sm text-gray-500">% of Sum Assured paid based on disability severity.</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-purple-100/50 rounded-xl border border-purple-100 opacity-80 cursor-not-allowed">
                                                <div className="flex items-start gap-3">
                                                    <input type="checkbox" checked disabled className="mt-1 w-5 h-5 text-[#4E1686] rounded border-[#4E1686] bg-purple-200" />
                                                    <div>
                                                        <span className="block font-bold text-[#002B5C]">Premium Protection Benefit (Life Assured)</span>
                                                        <span className="text-sm text-gray-500">Waives premiums on Permanent Total Disability (Accident/Sickness).</span>
                                                    </div>
                                                </div>
                                            </div>


                                            {/* OPTIONAL BENEFITS */}

                                            {/* 1. Global Hospital (Family) */}
                                            <label className="flex items-start gap-3 p-4 bg-purple-50/50 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors border border-purple-100/50 hover:border-purple-200">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.globalHospital}
                                                    onChange={(e) => setFormData({ ...formData, globalHospital: e.target.checked })}
                                                    className="mt-1 w-5 h-5 text-[#4E1686] rounded border-gray-300 focus:ring-[#4E1686]"
                                                />
                                                <div>
                                                    <span className="block font-bold text-[#002B5C]">Global Hospital Cover (Entire Family)</span>
                                                    <span className="text-sm text-gray-500">Comprehensive medical coverage for you, spouse and children.</span>
                                                </div>
                                            </label>

                                            {/* 2. Critical Illness (You) */}
                                            <label className="flex items-start gap-3 p-4 bg-purple-50/50 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors border border-purple-100/50 hover:border-purple-200">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.criticalIllness}
                                                    onChange={(e) => setFormData({ ...formData, criticalIllness: e.target.checked })}
                                                    className="mt-1 w-5 h-5 text-[#4E1686] rounded border-gray-300 focus:ring-[#4E1686]"
                                                />
                                                <div>
                                                    <span className="block font-bold text-[#002B5C]">Critical Illness Benefit (For You)</span>
                                                    <span className="text-sm text-gray-500">Covers 36 major illnesses including Heart Attack, Cancer, Stroke & Kidney Failure.</span>
                                                </div>
                                            </label>

                                            {/* 2b. Critical Illness (Spouse) */}
                                            <label className="flex items-start gap-3 p-4 bg-purple-50/50 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors border border-purple-100/50 hover:border-purple-200">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.criticalIllnessSpouse}
                                                    onChange={(e) => setFormData({ ...formData, criticalIllnessSpouse: e.target.checked })}
                                                    className="mt-1 w-5 h-5 text-[#4E1686] rounded border-gray-300 focus:ring-[#4E1686]"
                                                />
                                                <div>
                                                    <span className="block font-bold text-[#002B5C]">Critical Illness Benefit (For Spouse)</span>
                                                    <span className="text-sm text-gray-500">Covers 36 major illnesses including Heart Attack, Cancer, Stroke & Kidney Failure.</span>
                                                </div>
                                            </label>

                                            {/* 3. Hospitalization (You) - NEW */}
                                            <label className="flex items-start gap-3 p-4 bg-purple-50/50 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors border border-purple-100/50 hover:border-purple-200">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.hospitalizationSelf}
                                                    onChange={(e) => setFormData({ ...formData, hospitalizationSelf: e.target.checked })}
                                                    className="mt-1 w-5 h-5 text-[#4E1686] rounded border-gray-300 focus:ring-[#4E1686]"
                                                />
                                                <div>
                                                    <span className="block font-bold text-[#002B5C]">Hospitalization Benefits (For you) </span>
                                                    <span className="text-sm text-gray-500">Daily benefit for income loss, medical bills & transport (Self).</span>
                                                </div>
                                            </label>

                                            {/* 4. Hospitalization (Spouse/Children) */}
                                            <label className="flex items-start gap-3 p-4 bg-purple-50/50 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors border border-purple-100/50 hover:border-purple-200">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.hospitalizationPerDay}
                                                    onChange={(e) => setFormData({ ...formData, hospitalizationPerDay: e.target.checked })}
                                                    className="mt-1 w-5 h-5 text-[#4E1686] rounded border-gray-300 focus:ring-[#4E1686]"
                                                />
                                                <div>
                                                    <span className="block font-bold text-[#002B5C]">Hospitalization Benefits (For Spouse/Children)</span>
                                                    <span className="text-sm text-gray-500">Daily benefit for income loss, medical bills & transport (Spouse/Children).</span>
                                                </div>
                                            </label>

                                            {/* 5. Family Income */}
                                            <label className="flex items-start gap-3 p-4 bg-purple-50/50 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors border border-purple-100/50 hover:border-purple-200">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.familyIncome}
                                                    onChange={(e) => setFormData({ ...formData, familyIncome: e.target.checked })}
                                                    className="mt-1 w-5 h-5 text-[#4E1686] rounded border-gray-300 focus:ring-[#4E1686]"
                                                />
                                                <div>
                                                    <span className="block font-bold text-[#002B5C]">Family Income Benefit (For Family) </span>
                                                    <span className="text-sm text-gray-500">Monthly income on Death or Total Permanent Disability.</span>
                                                </div>
                                            </label>

                                            {/* 6. Additional Life */}
                                            <label className="flex items-start gap-3 p-4 bg-purple-50/50 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors border border-purple-100/50 hover:border-purple-200">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.additionalLife}
                                                    onChange={(e) => setFormData({ ...formData, additionalLife: e.target.checked })}
                                                    className="mt-1 w-5 h-5 text-[#4E1686] rounded border-gray-300 focus:ring-[#4E1686]"
                                                />
                                                <div>
                                                    <span className="block font-bold text-[#002B5C]">Additional Life Benefit (For Family)</span>
                                                    <span className="text-sm text-gray-500">Secure your family’s financial future with a larger payout that covers debts, education, and living expenses.</span>
                                                </div>
                                            </label>

                                            {/* 7. Premium Protection (Spouse) - NEW OPTIONAL */}
                                            <label className="flex items-start gap-3 p-4 bg-purple-50/50 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors border border-purple-100/50 hover:border-purple-200">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.premiumProtectionSpouse}
                                                    onChange={(e) => setFormData({ ...formData, premiumProtectionSpouse: e.target.checked })}
                                                    className="mt-1 w-5 h-5 text-[#4E1686] rounded border-gray-300 focus:ring-[#4E1686]"
                                                />
                                                <div>
                                                    <span className="block font-bold text-[#002B5C]">Premium Protection Benefit (On Spouse)</span>
                                                    <span className="text-sm text-gray-500">Waives premiums if spouse is permanently disabled.</span>
                                                </div>
                                            </label>

                                            {/* 8. Maternity Benefit */}
                                            <label className="flex items-start gap-3 p-4 bg-purple-50/50 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors border border-purple-100/50 hover:border-purple-200">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.maternityBenefit}
                                                    onChange={(e) => setFormData({ ...formData, maternityBenefit: e.target.checked })}
                                                    className="mt-1 w-5 h-5 text-[#4E1686] rounded border-gray-300 focus:ring-[#4E1686]"
                                                />
                                                <div>
                                                    <span className="block font-bold text-[#002B5C]">Maternity Benefit</span>
                                                    <span className="text-sm text-gray-500">Comprehensive coverage for pregnancy and childbirth related expenses.</span>
                                                </div>
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-[#4E1686] border-b pb-2 border-purple-100">Professional & Financial</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Occupation / Designation</label>
                                        <input
                                            type="text"
                                            name="occupation"
                                            required
                                            value={formData.occupation}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8CC63F] transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Monthly Gross Income</label>
                                        <select
                                            name="monthlyIncome"
                                            required
                                            value={formData.monthlyIncome}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8CC63F] transition bg-white"
                                        >
                                            <option value="" disabled>Select Income Range</option>
                                            <option value="5000-80000">5,000 - 80,000</option>
                                            <option value="80000-100000">80,000 - 100,000</option>
                                            <option value="100000+">100,000+</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Notes */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-[#4E1686] border-b pb-2 border-purple-100">Other Details</h3>

                                <div>
                                    <label className="block text-sm font-semibold mb-1">Any additional details to tell us?</label>
                                    <textarea
                                        name="additionalNotes"
                                        rows={3}
                                        value={formData.additionalNotes}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Submit Section */}
                            <div className="pt-4 border-t border-gray-100">
                                <div className="bg-green-50 text-green-800 text-sm p-3 rounded mb-6 border border-green-100">
                                    <strong>Note:</strong> Premiums can be paid via Cash, Cheque, Online Transfer, or Credit Card.
                                    <span className="block mt-1 text-xs">Attractive discounts applicable for annual payments.</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full bg-[#8CC63F] hover:bg-[#7ab332] text-white font-bold py-4 rounded-xl shadow-lg transition transform hover:scale-[1.01] active:scale-[0.99] text-lg uppercase tracking-wide flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : null}
                                    {loading ? 'Submitting...' : 'Submit Details'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
