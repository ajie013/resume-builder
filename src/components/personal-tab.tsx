'use client';

import { Input } from '@/components/ui/input';
import { useInfoStore } from '@/store/useInfoStore';
import type { ChangeEvent } from 'react';
import { Textarea } from './ui/textarea';
import { Label } from '@radix-ui/react-dropdown-menu';

export default function PersonalTab() {
  const { personalInfo, setPersonalInfo } = useInfoStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({ [name]: value });
  };

  return (
    <div className='space-y-2 h-auto'>
      <h1 className='text-lg text-secondary-text dark:text-primary-text'>Personal Information</h1>
      <Input
        name="name"
        placeholder="Name"
        value={personalInfo.name}
        onChange={handleChange}
      />
      <Input
        name="address"
        placeholder="Address"
        value={personalInfo.address}
        onChange={handleChange}
      />
      <Input
        name="phone"
        placeholder="Phone number"
        value={personalInfo.phone}
        onChange={handleChange}
      />
      <Input
        name="email"
        placeholder="Email"
        value={personalInfo.email}
        onChange={handleChange}
      />
      
      <Textarea placeholder='Enter summary' name='summary' value={personalInfo.summary} onChange={handleChange}></Textarea>
    </div>
  );
}
