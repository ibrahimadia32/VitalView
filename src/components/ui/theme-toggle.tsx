'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  BTNclassName?: string;
}

export default function ThemesToggle({ BTNclassName }: ThemeToggleProps) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }
  const effectiveTheme = theme === 'system' ? resolvedTheme : theme;
  const isDark = effectiveTheme === 'dark';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={BTNclassName}>
          <motion.div
            initial={false}
            animate={{
              scale: isDark ? 0 : 1,
              rotate: isDark ? -90 : 0,
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
          <motion.div
            className="absolute"
            initial={false}
            animate={{
              scale: isDark ? 1 : 0,
              rotate: isDark ? 0 : 90,
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
        >
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer">
            <motion.div className="flex items-center w-full" whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
              {theme === 'light' && (
                <motion.span
                  className="ml-auto"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  ✓
                </motion.span>
              )}
            </motion.div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer">
            <motion.div className="flex items-center w-full" whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
              {theme === 'dark' && (
                <motion.span
                  className="ml-auto"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  ✓
                </motion.span>
              )}
            </motion.div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')} className="cursor-pointer">
            <motion.div className="flex items-center w-full" whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
              <Monitor className="mr-2 h-4 w-4" />
              <span>System</span>
              {theme === 'system' && (
                <motion.span
                  className="ml-auto"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  ✓
                </motion.span>
              )}
            </motion.div>
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
