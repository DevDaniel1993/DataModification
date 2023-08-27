// import APIClient from "./APIClient";

// class HttpServices {
//   constructor(private readonly endPoint: string ) {}
//   getAll<T>() {
//     const controller = new AbortController();
//     const request = APIClient.get<T[]>(this.endPoint, {
//       signal: controller.signal,
//     });
//     return {
//       request,
//       cancel: () => {
//         controller.abort();
//       },
//     };
//   }

//   delete(id: number) {
//     return APIClient.delete(this.endPoint + "/" + id);
//   }

//   update<T extends { id: number }>(entity: T) {
//     return APIClient.patch(this.endPoint + "/" + entity.id, entity);
//   }

//   create<T>(entity: T) {
//     return APIClient.post(this.endPoint + "/", entity);
//   }
// }

// const create = (endPoint: string) => new HttpServices(endPoint);

// export default create;

import APIClient from "./APIClient";

class HttpServices {
  constructor(protected readonly endPoint: string) {}
  getAll<T>() {
    const controller = new AbortController();
    const request = APIClient.get<T[]>(this.endPoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  delete(id: number) {
    return APIClient.delete(this.endPoint + "/" + id);
  }

  create<T>(entity: T) {
    return APIClient.post(this.endPoint + "/", entity);
  }

  update<T extends { id: number }>(entity: T) {
    return APIClient.patch(this.endPoint + "/" + entity.id, entity);
  }
}

const create = (endPoint: string) => new HttpServices(endPoint);

export default create;
