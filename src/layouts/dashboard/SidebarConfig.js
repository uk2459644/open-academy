import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/image-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import presetOutlineFill from '@iconify/icons-eva/percent-fill';
import editorFill from '@iconify/icons-eva/edit-fill';
import clipboardFill from '@iconify/icons-eva/clipboard-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;


const sidebarConfig = [
  {
    title: 'intro',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'photos',
    path: '/dashboard/photos',
    icon: getIcon(peopleFill)
  },
  {
    title: 'sets',
    path: '/dashboard/sets',
    icon: getIcon(clipboardFill)
  },
  {
    title: 'course',
    path: '/dashboard/courses',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'formula editor',
    path: '/dashboard/formula',
    icon: getIcon(presetOutlineFill)
  },
  {
    title: 'Content editor',
    path: '/dashboard/content',
    icon: getIcon(editorFill)
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon(fileTextFill)
  // },
  {
    title: 'login',
    path: '/login',
    icon: getIcon(lockFill)
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon(personAddFill)
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon(alertTriangleFill)
  }
];

export default sidebarConfig;
