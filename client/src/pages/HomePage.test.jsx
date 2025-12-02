import React from "react";
import { render, screen , fireEvent } from "@testing-library/react";
import { renderWithStore } from "../../test-utils.jsx";
import UserHintModal from "../components/UserHintModal.jsx";
import '@testing-library/jest-dom';

const mockOnClose = jest.fn();

    test("1. Should render content, header, and be closable when opened (isOpen=true)", () => {
        
        renderWithStore(<UserHintModal isOpen={true} onClose={mockOnClose} />, {
            properties: {
              properties: [],
              isFetching: false
            }
        });

        const headerText = screen.getByText(/คำแนะนำ/i); 
        expect(headerText).toBeInTheDocument();

        const closeButton = screen.getByRole('button', { name: /เข้าใจแล้ว/i });
        expect(closeButton).toBeInTheDocument();
        
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);

    });

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));
jest.mock("../redux/actions/UserAction", () => ({
  alluser: jest.fn(() => ({ type: "ALL_USERS" })), 
  register: jest.fn(),
}));

