import { FC, PropsWithChildren } from 'react';
import { FormProvider, useForm, UseFormProps } from 'react-hook-form';

export type TFormWrapperProps = UseFormProps;

export const FormWrapper: FC<PropsWithChildren<TFormWrapperProps>> = ({ children, ...rest }) => {
  const methods = useForm(rest);
  const values = methods.watch();

  const html = `<pre style="white-space: pre-wrap; word-break: break-all;"><code class="language-json">Form: ${JSON.stringify(values, null, '\t')}</code></pre>`;

  return (
    <FormProvider {...methods}>
      <div style={{ width: '420px' }}>
        {children}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </FormProvider>
  );
};
