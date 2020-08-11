export type Action<T extends string = string, P = void> = P extends void
  ? Readonly<{ type: T }>
  : Readonly<{ type: T; payload: P }>;

type ActionCreator<T extends string> = {
  (): Action<T>;
  type: T;
};

type ActionWithPayloadCreator<
  T extends string,
  P,
  F extends (...args: any) => Action<T, P>
> = F & { type: T };

export function actionCreator<T extends string>(type: T): ActionCreator<T>;
export function actionCreator<
  T extends string,
  F extends (...args: any) => any,
  P = ReturnType<F>,
  Args = Parameters<F>
>(
  type: T,
  getPayload: F
): ActionWithPayloadCreator<
  T,
  P,
  (
    // @ts-ignore
    ...args: Args
  ) => Action<T, P>
>;

export function actionCreator(type: any, getPayload?: any): any {
  const creatorImpl = (...args: any[]) => {
    const payload = getPayload ? getPayload(...args) : undefined;
    return { type, payload };
  };

  creatorImpl.type = type;
  return creatorImpl;
}

export type ActionsUnion<
  A extends {
    [key: string]: ActionCreator<any> | ActionWithPayloadCreator<any, any, any>;
  }
> = ReturnType<A[keyof A]>;

export type ActionOf<
  A extends {
    [key: string]: ActionCreator<any> | ActionWithPayloadCreator<any, any, any>;
  },
  K extends string
> = A extends Action<K> ? A : never;
