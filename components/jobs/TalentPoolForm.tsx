'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TalentPoolFormProps {
  translations: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    cvLabel: string;
    cvDropzoneText: string;
    cvFormats: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    errorMessage: string;
    tryAgain: string;
    required: string;
    invalidEmail: string;
    invalidFileType: string;
    fileTooLarge: string;
  };
}

interface FormState {
  name: string;
  email: string;
  file: File | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  file?: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function TalentPoolForm({ translations }: TalentPoolFormProps) {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    file: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formState.name.trim()) {
      newErrors.name = translations.required;
    }

    if (!formState.email.trim()) {
      newErrors.email = translations.required;
    } else if (!validateEmail(formState.email)) {
      newErrors.email = translations.invalidEmail;
    }

    if (!formState.file) {
      newErrors.file = translations.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileValidation = (file: File): string | null => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return translations.invalidFileType;
    }
    if (file.size > MAX_FILE_SIZE) {
      return translations.fileTooLarge;
    }
    return null;
  };

  const handleFileSelect = useCallback(
    (file: File | null) => {
      if (!file) return;

      const error = handleFileValidation(file);
      if (error) {
        setErrors((prev) => ({ ...prev, file: error }));
        return;
      }

      setFormState((prev) => ({ ...prev, file }));
      setErrors((prev) => ({ ...prev, file: undefined }));
    },
    [translations]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);

      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFileSelect(file || null);
  };

  const removeFile = () => {
    setFormState((prev) => ({ ...prev, file: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitStatus('submitting');

    try {
      const formData = new FormData();
      formData.append('name', formState.name.trim());
      formData.append('email', formState.email.trim());
      if (formState.file) {
        formData.append('file', formState.file);
      }

      const response = await fetch('/api/candidates', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSubmitStatus('success');
      setFormState({ name: '', email: '', file: null });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  const resetForm = () => {
    setSubmitStatus('idle');
    setErrors({});
  };

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle2 className="size-16 text-[#00B894] mx-auto mb-4" />
        <h3 className="text-[24px] font-bold text-[#4c4d58] mb-2">
          {translations.successTitle}
        </h3>
        <p className="text-[15px] text-[#6b7280]">{translations.successMessage}</p>
      </motion.div>
    );
  }

  if (submitStatus === 'error') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <AlertCircle className="size-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-[24px] font-bold text-[#4c4d58] mb-2">
          {translations.errorTitle}
        </h3>
        <p className="text-[15px] text-[#6b7280] mb-6">{translations.errorMessage}</p>
        <Button variant="brand" onClick={resetForm}>
          {translations.tryAgain}
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label
          htmlFor="talent-name"
          className="block text-[14px] font-medium text-[#4c4d58] mb-2"
        >
          {translations.nameLabel}{' '}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="talent-name"
          value={formState.name}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder={translations.namePlaceholder}
          className={`w-full h-[48px] px-4 rounded-[8px] border bg-white text-[15px] text-[#4c4d58] placeholder:text-[#9ca3af] outline-none transition-colors ${
            errors.name
              ? 'border-red-500 focus:border-red-500'
              : 'border-[#e5e7eb] focus:border-[#00B894]'
          }`}
        />
        <AnimatePresence>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-[13px] text-red-500 mt-1"
            >
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="talent-email"
          className="block text-[14px] font-medium text-[#4c4d58] mb-2"
        >
          {translations.emailLabel}{' '}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="talent-email"
          value={formState.email}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder={translations.emailPlaceholder}
          className={`w-full h-[48px] px-4 rounded-[8px] border bg-white text-[15px] text-[#4c4d58] placeholder:text-[#9ca3af] outline-none transition-colors ${
            errors.email
              ? 'border-red-500 focus:border-red-500'
              : 'border-[#e5e7eb] focus:border-[#00B894]'
          }`}
        />
        <AnimatePresence>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-[13px] text-red-500 mt-1"
            >
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-[14px] font-medium text-[#4c4d58] mb-2">
          {translations.cvLabel} <span className="text-red-500">*</span>
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-[8px] p-8 text-center cursor-pointer transition-colors ${
            isDragOver
              ? 'border-[#00B894] bg-[#00B894]/5'
              : errors.file
                ? 'border-red-500 bg-red-50'
                : 'border-[#e5e7eb] hover:border-[#00B894] bg-white'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {formState.file ? (
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2 bg-[#f3f4f6] px-4 py-2 rounded-full">
                <span className="text-[14px] text-[#4c4d58] font-medium truncate max-w-[200px]">
                  {formState.file.name}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="text-[#6b7280] hover:text-red-500 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <Upload className="size-8 text-[#9ca3af] mx-auto mb-3" />
              <p className="text-[14px] text-[#6b7280]">
                {translations.cvDropzoneText}
              </p>
              <p className="text-[13px] text-[#9ca3af] mt-1">
                {translations.cvFormats}
              </p>
            </>
          )}
        </div>
        <AnimatePresence>
          {errors.file && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-[13px] text-red-500 mt-1"
            >
              {errors.file}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="brand"
        disabled={submitStatus === 'submitting'}
        className="w-full h-[48px] text-[15px] font-semibold rounded-[8px]"
      >
        {submitStatus === 'submitting' ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {translations.submitting}
          </>
        ) : (
          translations.submit
        )}
      </Button>
    </form>
  );
}

