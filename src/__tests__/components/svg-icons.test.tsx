import { render } from '@testing-library/react';

import {
  ExplorerArrowSvg,
  ExplorerCatalogSvg,
  ExplorerDocsSvg,
  ExplorerHeadersSvg,
  ExplorerOtherSvg,
  ExplorerPrettifyingSvg,
  ExplorerResultSvg,
  ExplorerVariablesSvg,
  GoogleSvg,
  NotFoundSvg,
  RSSchoolSvg,
  TeamSvg,
  VkSvg,
} from '@/components/svg-icons';

describe('components/svg-icons', () => {
  it('renders correct base svg-icons length', () => {
    const { container } = render(
      <>
        <GoogleSvg />
        <NotFoundSvg />
        <VkSvg />
      </>
    );

    const svgElements = container.querySelectorAll('svg');

    expect(svgElements).toHaveLength(3);
  });

  it('renders correct explorer svg-icons length', () => {
    const { container } = render(
      <>
        <ExplorerArrowSvg isShow={true} />
        <ExplorerCatalogSvg />
        <ExplorerDocsSvg />

        <ExplorerHeadersSvg />
        <ExplorerOtherSvg />
        <ExplorerPrettifyingSvg />

        <ExplorerResultSvg />
        <ExplorerVariablesSvg />
      </>
    );

    const svgElements = container.querySelectorAll('svg');

    expect(svgElements).toHaveLength(8);
  });

  it('renders correct footer svg-icons length', () => {
    const { container } = render(
      <>
        <RSSchoolSvg className={''} />
        <TeamSvg />
      </>
    );

    const svgElements = container.querySelectorAll('svg');

    expect(svgElements).toHaveLength(2);
  });
});
