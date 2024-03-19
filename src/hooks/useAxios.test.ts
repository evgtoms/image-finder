import { renderHook } from "@testing-library/react"
import useAxios from "./useAxios"
import axios from "axios"
import { act } from "react-dom/test-utils"

jest.mock('axios');

const useApiMockData = {
    alt_description: 'descriprion',
    id: '0',
    height: '1',
    width: '1',
    urls: {
        full: 'full',
        small: 'small',
        regular: 'regular',
        thumb: 'thumb',
    }
}

describe("useAxios Hook", () => {
    test("initial state", async () => {
        const { result } = renderHook(() => useAxios())
        expect(result.current).toMatchObject({
            error: "",
            response: null
        })        
    })
    test("call fetch", async () => {
        (axios.get as jest.Mock).mockResolvedValue({data: useApiMockData})
        const { result } = renderHook(() => useAxios())
        await act(async () => result.current.fetchImage('query'));
        expect(result.current).toMatchObject({
            error: "",
            response: useApiMockData
        })      
    })

    test("call fetch failed", async () => {
        const getError = new Error('network error');
        (axios.get as jest.Mock).mockRejectedValue(getError)
        const { result } = renderHook(() => useAxios())
        await act(async () => result.current.fetchImage('query'));
        expect(result.current).toMatchObject({
            error: "can not load image",
            response: null
        })      
    })
})