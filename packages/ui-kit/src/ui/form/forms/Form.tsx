import { ReactNode } from 'react';

import { Form as AntdForm, FormProps } from 'antd';
import { FormLayout } from 'antd/es/form/Form';

/**
 * @property {FormLayout} [layout] - Тип шаблона формы
 * @property {ReactNode} [children] - Контент формы
 * */
type TProps = FormProps & {
  layout: FormLayout;
  children?: ReactNode;
};

/**
 * Форма (обертка формы из Ant Design)
 */
function Form(props: TProps) {
  return <AntdForm {...props} />;
}

Form.useForm = AntdForm.useForm;

export { Form };
