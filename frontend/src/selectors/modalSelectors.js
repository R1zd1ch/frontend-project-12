const modalSelectors = {
  selectIsOpen: (state) => state.modal.isOpen,
  selectType: (state) => state.modal.type,
  selectItemId: (state) => state.modal.item.id,
  selectItemName: (state) => state.modal.item.name,
};
export default modalSelectors;
