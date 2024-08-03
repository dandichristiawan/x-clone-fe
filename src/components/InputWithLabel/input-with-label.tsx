import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { usePasswordToggle } from '@/hooks/authentication.hooks';

type Props = {
  label: string;
  typeProps: string;
  valueProps: string;
  nameProps: string;
  placeholderProps: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputWithLabel = ({
  label,
  typeProps,
  valueProps,
  nameProps,
  placeholderProps,
  onChange,
}: Props) => {

  const { showPassword, toggleShowPassword } = usePasswordToggle();

  return (
    <div className="grid w-full items-center gap-1.5 relative">
      <Label className="text-white" htmlFor="email">
        {label}
      </Label>
      <Input
        className="rounded-xl"
        type={showPassword ? 'text' : typeProps}
        value={valueProps}
        name={nameProps}
        onChange={onChange}
        placeholder={placeholderProps}
      />
      {typeProps === 'password' && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleShowPassword}
          className="absolute right-0 top-2 h-full px-3 py-1 hover:bg-transparent"
        >
          {showPassword ? (
            <EyeOffIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );
};
