'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

export default function QuotePage() {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        nic: '',
        address: '',
        incomePrimary: '',
        incomeInvestment: '',
        incomeOther: '',
        civilStatus: 'single', // single, married, divorced
        spouseName: '',
        spouseDob: '',
        spouseNic: '',
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
        company: '',
        occupation: '',
        incomeSource1: '',
        incomeSource2: '',
        incomeSource3: '',
        assets: [
            { type: '', value: '' },
            { type: '', value: '' },
            { type: '', value: '' }
        ] as { type: string; value: string }[],
        education: '',
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
        setFormData(prev => ({
            ...prev,
            civilStatus: status,
            // Reset dependent fields if not married
            spouseName: status === 'married' ? prev.spouseName : '',
            spouseNic: status === 'married' ? prev.spouseNic : '',
            familyPlan: status === 'married' ? prev.familyPlan : false,
            children: status === 'married' ? prev.children : [],
            childCount: status === 'married' ? prev.childCount : ''
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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        alert('Thank you! Your details have been submitted. We will contact you shortly.');
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

    const handleAssetChange = (index: number, field: 'type' | 'value', value: string) => {
        const newAssets = [...formData.assets];
        newAssets[index][field] = value;
        setFormData(prev => ({ ...prev, assets: newAssets }));
    };

    const addAssetRow = () => {
        setFormData(prev => ({
            ...prev,
            assets: [...prev.assets, { type: '', value: '' }]
        }));
    };

    const removeAssetRow = (index: number) => {
        setFormData(prev => ({
            ...prev,
            assets: prev.assets.filter((_, i) => i !== index)
        }));
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
                                </div>
                            </div>


                            {/* Civil Status */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-[#4E1686] border-b pb-2 border-purple-100">Civil Status</h3>
                                <div className="flex gap-6">
                                    {['single', 'married', 'divorced'].map((status) => (
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

                                {/* Married Logic */}
                                {formData.civilStatus === 'married' && (
                                    <div className="space-y-6 pl-4 border-l-2 border-purple-100 bg-purple-50 p-4 rounded-r-lg">

                                        {/* Child Count Input (Non-Family Plan Position - moves if selected) */}
                                        {!formData.familyPlan && (
                                            <div className="mb-4 animate-fade-in">
                                                <label className="block text-sm font-semibold mb-1">Number of Children</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    name="childCount"
                                                    required
                                                    value={formData.childCount}
                                                    onChange={handleChildCountChange}
                                                    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8CC63F] transition"
                                                    placeholder="0"
                                                />
                                            </div>
                                        )}

                                        {/* Family Plan Trigger */}
                                        <div className="flex items-center">
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

                                        {/* Gated Fields */}
                                        {formData.familyPlan && (
                                            <div className="space-y-4 animate-fade-in">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-semibold mb-1">Spouse Full Name</label>
                                                        <input
                                                            type="text"
                                                            name="spouseName"
                                                            required
                                                            value={formData.spouseName}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white"
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
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="pt-2">
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-semibold mb-1">Number of Children</label>
                                                        <input
                                                            type="number"
                                                            name="childCount"
                                                            min="0"
                                                            required
                                                            value={formData.childCount}
                                                            onChange={handleChildCountChange}
                                                            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8CC63F] transition bg-white"
                                                            placeholder="0"
                                                        />
                                                    </div>

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
                                            </div>
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
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-[#4E1686] border-b pb-2 border-purple-100">Professional & Financial</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Company / Organization</label>
                                        <input
                                            type="text"
                                            name="company"
                                            required
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Occupation / Designation</label>
                                        <input
                                            type="text"
                                            name="occupation"
                                            required
                                            value={formData.occupation}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-sm font-semibold">Income Sources</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <input
                                            type="text"
                                            name="incomeSource1"
                                            required
                                            value={formData.incomeSource1}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none placeholder-gray-400 text-sm"
                                            placeholder="Primary Income"
                                        />
                                        <input
                                            type="text"
                                            name="incomeSource2"
                                            value={formData.incomeSource2}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none placeholder-gray-400 text-sm"
                                            placeholder="Secondary Income"
                                        />
                                        <input
                                            type="text"
                                            name="incomeSource3"
                                            value={formData.incomeSource3}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none placeholder-gray-400 text-sm"
                                            placeholder="Other Income"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">Other Assets & Financial Details</label>
                                    <div className="space-y-3">
                                        {formData.assets.map((asset, index) => (
                                            <div key={index} className="flex gap-3 items-center">
                                                <div className="w-1/2">
                                                    <select
                                                        value={asset.type}
                                                        onChange={(e) => handleAssetChange(index, 'type', e.target.value)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white text-sm"
                                                    >
                                                        <option value="">Select Asset Type</option>
                                                        <option value="Land">Land</option>
                                                        <option value="Vehicle">Vehicle</option>
                                                        <option value="House">House</option>
                                                        <option value="Fixed Deposit">Fixed Deposit</option>
                                                        <option value="Stocks">Stocks</option>
                                                        <option value="Jewelry">Jewelry</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="w-1/2">
                                                    <input
                                                        type="text"
                                                        placeholder="Value / Price"
                                                        value={asset.value}
                                                        onChange={(e) => handleAssetChange(index, 'value', e.target.value)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none text-sm placeholder-gray-400"
                                                    />
                                                </div>
                                                {/* Optional: Add delete button if needed, user only asked for add button but delete is good UX */}
                                                {/* <button type="button" onClick={() => removeAssetRow(index)} className="text-red-500">x</button> */}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={addAssetRow}
                                            className="mt-2 text-sm font-bold text-[#4E1686] hover:text-purple-700 flex items-center gap-1"
                                        >
                                            + Add Another Asset
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Education & Insurance Needs */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-[#4E1686] border-b pb-2 border-purple-100">Other Details</h3>

                                <div>
                                    <label className="block text-sm font-semibold mb-1">Highest Educational Qualification</label>
                                    <select
                                        name="education"
                                        required
                                        value={formData.education}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white"
                                    >
                                        <option value="">Select Qualification</option>
                                        <option value="OL">O/L</option>
                                        <option value="AL">A/L</option>
                                        <option value="Diploma">Diploma</option>
                                        <option value="Degree">Degree</option>
                                        <option value="Masters">Masters</option>
                                        <option value="PhD">PhD</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>



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
                                    className="w-full bg-[#8CC63F] hover:bg-[#7ab332] text-white font-bold py-4 rounded-xl shadow-lg transition transform hover:scale-[1.01] active:scale-[0.99] text-lg uppercase tracking-wide"
                                >
                                    Submit Details
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
