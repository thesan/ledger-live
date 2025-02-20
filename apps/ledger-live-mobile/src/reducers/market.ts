import { Action, ReducerMap, handleActions } from "redux-actions";
import { MarketState, State } from "./types";
import {
  MarketSetCurrentPagePayload,
  MarketSetMarketFilterByStarredCurrenciesPayload,
  MarketSetMarketRequestParamsPayload,
  MarketStateActionTypes,
  MarketStatePayload,
} from "~/actions/types";
import { Order } from "@ledgerhq/live-common/market/utils/types";

export const LIMIT = 20;

export const INITIAL_STATE: MarketState = {
  marketParams: {
    range: "24h",
    limit: LIMIT,
    starred: [],
    order: Order.MarketCapDesc,
    search: "",
    liveCompatible: false,
    page: 1,
    counterCurrency: "usd",
  },
  marketFilterByStarredCurrencies: false,
  marketCurrentPage: 1,
};

const handlers: ReducerMap<MarketState, MarketStatePayload> = {
  [MarketStateActionTypes.SET_MARKET_REQUEST_PARAMS]: (state, action) => ({
    ...state,
    marketParams: {
      ...state.marketParams,
      ...(action as Action<MarketSetMarketRequestParamsPayload>).payload,
    },
  }),
  [MarketStateActionTypes.SET_MARKET_FILTER_BY_STARRED_CURRENCIES]: (state, action) => ({
    ...state,
    marketFilterByStarredCurrencies: (
      action as Action<MarketSetMarketFilterByStarredCurrenciesPayload>
    ).payload,
  }),

  [MarketStateActionTypes.MARKET_SET_CURRENT_PAGE]: (state, action) => ({
    ...state,
    marketCurrentPage: (action as Action<MarketSetCurrentPagePayload>).payload,
  }),
};

// Selectors

export const marketParamsSelector = (state: State) => state.market.marketParams;
export const marketFilterByStarredCurrenciesSelector = (state: State) =>
  state.market.marketFilterByStarredCurrencies;
export const marketCurrentPageSelector = (state: State) => state.market.marketCurrentPage;

// Exporting reducer

export default handleActions<MarketState, MarketStatePayload>(handlers, INITIAL_STATE);
