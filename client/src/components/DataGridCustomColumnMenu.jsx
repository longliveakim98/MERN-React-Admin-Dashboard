import {
  GridColumnMenuContainer,
  GridColumnMenuFilterItem,
  GridColumnMenuHideItem,
} from "@mui/x-data-grid";

const CustomColumnMenu = (props) => {
  const itemProps = {
    colDef: props.colDef,
    onClick: props.hideMenu,
  };
  return (
    <GridColumnMenuContainer {...props}>
      <GridColumnMenuFilterItem {...itemProps} />
      <GridColumnMenuHideItem {...itemProps} />
    </GridColumnMenuContainer>
  );
};

export default CustomColumnMenu;
