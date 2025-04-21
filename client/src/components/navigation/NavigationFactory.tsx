import React from "react";
import { NavigationType } from "../../types";
import Pagination from "./Pagination";
import LoadMore from "./LoadMore";

interface NavigationFactoryProps {
  navigation: string;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onLoadMore: () => void;
}

const NavigationFactory: React.FC<NavigationFactoryProps> = (props) => {
  const { navigation, ...rest } = props;

  switch (navigation) {
    case NavigationType.PAGINATION:
      return <Pagination {...rest} />;
    case NavigationType.LOAD_MORE:
      return <LoadMore {...rest} />;
    default:
      return <Pagination {...rest} />;
  }
};

export default React.memo(NavigationFactory);
