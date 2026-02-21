'use client';

import { type CSSProperties, type FC, useEffect, useState } from 'react';
import type { IconType } from '@react-icons/all-files';

interface IconProps {
  name: string;
  color?: string;
  size?: number | string;
  className?: string;
  style?: CSSProperties;
}

const prefixes = [
  'Vsc',
  'Fc',
  'Fa',
  'Fi',
  'Gi',
  'Go',
  'Gr',
  'Hi',
  'Im',
  'Io',
  'Md',
  'Ri',
  'Si',
  'Ti',
  'Wi',
  'Di',
  'Bs',
  'Bi',
  'Cg',
  'Ci',
  'Ai',
  'Lu',
  'Pi',
  'Rx',
  'Sl',
  'Tb'
].sort((a, b) => b.length - a.length);

function getPrefix(name: string): string | undefined {
  return prefixes.find((p) => name.startsWith(p));
}

function getPrefixLower(prefix: string): string {
  const map: Record<string, string> = {
    Io: 'io5'
  };
  return map[prefix] ?? prefix.toLowerCase();
}

const Icon: FC<IconProps> = ({ name, color, size = 24, className, style }) => {
  const [IconComponent, setIconComponent] = useState<IconType | null>(null);

  useEffect(() => {
    const prefix = getPrefix(name);

    if (!prefix) {
      console.warn(`[Icon] No se encontró librería para el icono: "${name}"`);
      return;
    }

    const dir = getPrefixLower(prefix);

    import(`@react-icons/all-files/${dir}/${name}`)
      .then((module) => {
        const icon = module[name] as IconType | undefined;
        if (icon) {
          setIconComponent(() => icon);
        } else {
          console.warn(`[Icon] Icono "${name}" no encontrado en el módulo`);
        }
      })
      .catch((error) => {
        console.error(`[Icon] Error cargando icono "${name}":`, error);
      });
  }, [name]);

  if (!IconComponent) {
    return <span style={{ display: 'inline-block', width: size, height: size }} />;
  }

  return <IconComponent color={color} size={size} className={className} style={style} />;
};

export default Icon;
