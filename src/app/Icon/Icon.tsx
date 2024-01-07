interface Props {
  html: string;
}

export const Icon = (props: Props) => {
  const { html } = props;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
