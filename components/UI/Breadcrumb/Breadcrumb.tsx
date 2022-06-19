import Link from 'next/link';

import { HiChevronRight } from 'react-icons/hi';

/**
 * @member segments - The segment of the breadcrumb
 * @example <Breadcrumb segments={[{name: "Admin", path="/admin"}, {name: "Users", path="users"]} />
 */
interface BreadcrumbProps {
  segments: Segment[];
}

/**
 * @member path - The path of the segment can either be a absolute path or a relative to the last path in the array
 */
interface Segment {
  name: string;
  path: string;
}

export default function Breadcrumb({ segments }: BreadcrumbProps) {
  let fullPath = segments[0].path.startsWith('/')
    ? segments[0].path
    : `/${segments[0].path}`;

  return (
    <ul className="flex">
      {segments.map(({ name, path }, index) => {
        const isLast = index === segments.length - 1;

        const link =
          path.startsWith('/') || path === '#'
            ? path
            : (fullPath += `/${path}`);

        return (
          <li key={index} className={`flex items-center`}>
            <Link href={link}>
              <a
                className={`${
                  isLast
                    ? 'opacity-100 hover:opacity-90'
                    : 'opacity-80 hover:opacity-100'
                } transition-opacity`}
              >
                {name}
              </a>
            </Link>
            {!isLast && (
              <HiChevronRight className="text-xl fill-sand-500 opacity-80" />
            )}
          </li>
        );
      })}
    </ul>
  );
}
