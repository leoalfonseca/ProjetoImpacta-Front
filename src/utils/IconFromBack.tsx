import {
  IconPoint,
  IconUser,
  IconTestPipe,
  IconClipboard,
  IconPlus,
  IconDatabase,
  IconAdjustmentsHorizontal,
  IconNotebook,
  IconChartLine,
  IconShip,
} from '@tabler/icons-react';

const iconFronBack = (name: string) => {
  if (name) {
    switch (name) {
      case 'IconPoint':
        return <IconPoint />;
      case 'IconUser':
        return <IconUser />;
      case 'IconTestPipe':
        return <IconTestPipe />;
      case 'IconClipboard':
        return <IconClipboard />;
      case 'IconPlus':
        return <IconPlus />;
      case 'IconDatabase':
        return <IconDatabase />;
      case 'IconAdjustmentsHorizontal':
        return <IconAdjustmentsHorizontal />;
      case 'IconAdjustmentsHorizontal':
        return <IconAdjustmentsHorizontal />;
      case 'IconChartLine':
        return <IconChartLine />;
      case 'IconNotebook':
        return <IconNotebook />;
      case 'IconShip':
        return <IconShip />;
      default:
        return <IconPoint />;
    }
  }
};

export { iconFronBack };
