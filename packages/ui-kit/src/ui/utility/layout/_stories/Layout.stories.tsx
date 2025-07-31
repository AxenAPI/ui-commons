import { useState } from 'react';

import { Meta, type StoryFn } from '@storybook/react';
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarRightCollapse, IconMenu2 } from '@tabler/icons-react';

import { Button } from '@/ui';
import { Breadcrumbs } from '@/ui/navigation/breadcrumbs/Breadcrumbs';
import { STORYBOOK_ITEMS } from '@/ui/navigation/menu/_stories/consts';
import { Menu } from '@/ui/navigation/menu/Menu';
import { Tabs } from '@/ui/navigation/tabs/Tabs';
import { Content, Header, Sider } from '@/ui/utility/layout/index';

import { Layout } from '../Layout';
import { NLayout } from '../models';
import { SiderPanel } from '../sider-panel/SiderPanel';

export default {
  title: 'Axenix UI/Layout/Layout',
  component: Layout,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: { control: 'object' },
    style: { control: 'object' },
    isShowTab: { control: 'boolean' },
    isShowBreadCrumbs: { control: 'boolean' },
    isShowMenuBtn: { control: 'boolean' },
    items: { control: 'object' },
    title: { control: 'text' },
    menuIcon: { control: 'object' },
    Tab: { control: 'object' },
    BreadCrumbs: { control: 'object' },
    menuIconSize: { control: 'select', options: ['small', 'default', 'large'] },
  },
} as Meta<typeof Layout>;

const Template: StoryFn<NLayout.THeaderProps> = args => {
  return (
    <Layout style={{ margin: '0 auto', overflow: 'hidden' }}>
      <Header {...args} />
    </Layout>
  );
};

export const CustomHeader = Template.bind({});

export const CustomHeaderWithTab = Template.bind({});

export const CustomHeaderWithBreadCrumbs = Template.bind({});

export const CustomHeaderWithComponentTitle = Template.bind({});

export const LayoutWithContent = (args: NLayout.THeaderProps) => {
  return (
    <Layout>
      <Header {...args} />
      <Content style={{ padding: '24px', backgroundColor: 'white' }}>
        <p>Content</p>
      </Content>
    </Layout>
  );
};

export const LayoutWithMenu = (args: NLayout.THeaderProps & NLayout.TSiderProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleSider = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '90vh' }}>
      <Sider width="264px" collapsed={collapsed} onCollapse={setCollapsed} defaultCollapsed={false}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '72px',
            color: '#fff',
          }}
        >
          Logo
        </div>
        <Menu items={STORYBOOK_ITEMS} theme="dark" />
      </Sider>
      <Layout style={{ width: '100%' }}>
        <Header {...args} style={{ width: '100%', padding: '12px 24px 0 24px' }} onToggleSider={toggleSider} />
        <Content style={{ padding: '24px', width: '100%', backgroundColor: '#fff' }}>
          <p>Content</p>
        </Content>
      </Layout>
    </Layout>
  );
};

export const LayoutWithSiderPanel = (args: NLayout.THeaderProps & NLayout.TSiderProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const [isCollapsedPanel, setIsCollapsedPanel] = useState(true);

  const toggleSiderPanel = () => {
    setIsCollapsedPanel(!isCollapsedPanel);
  };

  const toggleSider = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ width: '96vw', overflow: 'hidden' }}>
      <Sider width="264px" collapsed={collapsed} onCollapse={setCollapsed} defaultCollapsed={false}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '72px',
            color: '#fff',
          }}
        >
          Logo
        </div>
        <Menu items={STORYBOOK_ITEMS} theme="dark" />
      </Sider>
      <Layout style={{ width: '100%' }}>
        <Header {...args} style={{ width: '100%', padding: '12px 24px 0 24px' }} onToggleSider={toggleSider}>
          <Button
            onClick={toggleSiderPanel}
            size="large"
            icon={
              isCollapsedPanel ? (
                <IconLayoutSidebarLeftCollapse stroke={1.5} />
              ) : (
                <IconLayoutSidebarRightCollapse stroke={1.5} />
              )
            }
          />
        </Header>
        <Content style={{ padding: '24px', width: '100%', backgroundColor: '#fff' }}>
          <Layout style={{ height: '100vh' }}>
            <Content>
              <p>Content</p>
            </Content>
            <SiderPanel title={'Заголовок'} isCollapsed={isCollapsedPanel}>
              <div>
                Александр Сергеевич Пушкин — русский поэт, драматург и прозаик, заложивший основы русского
                реалистического направления, литературный критик и теоретик литературы, историк, публицист, журналист,
                редактор и издатель. Один из самых авторитетных литературных деятелей первой трети XIX века.
              </div>
            </SiderPanel>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
};

CustomHeader.args = {
  style: { padding: '12px 24px 0 24px' },
  title: 'Название страницы',
  Tab: (
    <Tabs
      style={{ borderBottom: 0 }}
      items={[
        { key: '1', label: 'Таб 1', icon: <IconMenu2 stroke={1.5} /> },
        { key: '2', label: 'Таб 2', icon: <IconMenu2 stroke={1.5} /> },
      ]}
    />
  ),
};

CustomHeaderWithTab.args = {
  ...CustomHeader.args,
  isShowTab: true,
  title: 'Название страницы',
  Breadcrumbs: (
    <Breadcrumbs
      items={[
        {
          title: 'Справочники',
        },
        {
          title: 'Новый справочник',
        },
      ]}
      isLastCrumbBold={true}
    />
  ),
};

CustomHeaderWithBreadCrumbs.args = {
  ...CustomHeader.args,
  isShowBreadCrumbs: true,
  style: { padding: '12px 24px' },
  Breadcrumbs: (
    <Breadcrumbs
      items={[
        {
          title: 'Справочники',
        },
        {
          title: 'Новый справочник',
        },
      ]}
      isLastCrumbBold={true}
    />
  ),
};

CustomHeaderWithComponentTitle.args = {
  ...CustomHeader.args,
  title: (
    <div>
      Название страницы в виде <i>компонента</i>
    </div>
  ),
};

LayoutWithContent.args = {
  ...CustomHeader.args,
};

LayoutWithMenu.args = {
  ...CustomHeader.args,
  isShowMenuBtn: true,
  menuIcon: <IconMenu2 stroke={1.5} />,
  isShowBreadCrumbs: true,
  menuIconSize: 'large',
  Breadcrumbs: (
    <Breadcrumbs
      items={[
        {
          title: 'Задания',
        },
        {
          title: 'Андеррайтинг потребительского кредита',
        },
      ]}
      isLastCrumbBold={true}
    />
  ),
};

LayoutWithSiderPanel.args = {
  ...CustomHeader.args,
  isShowMenuBtn: true,
  menuIcon: <IconMenu2 stroke={1.5} />,
  isShowBreadCrumbs: true,
  menuIconSize: 'large',
  Breadcrumbs: (
    <Breadcrumbs
      items={[
        {
          title: 'Задания',
        },
        {
          title: 'Андеррайтинг потребительского кредита',
        },
      ]}
      isLastCrumbBold={true}
    />
  ),
  defaultButtons: <Header.DefaultHeaderIcons />,
};
