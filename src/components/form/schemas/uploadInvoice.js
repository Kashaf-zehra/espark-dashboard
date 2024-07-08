import * as Yup from 'yup';

export const uploadInvoiceFormSchema = Yup.object({
  employee_id: Yup.string().required('Employee id is is required'),
  invoice_date: Yup.string().required('Invoice date is required'),
  due_date: Yup.string()
    .required('Due date is required')
    .test(
      'is-greater',
      'Due date must be greater than invoice date',
      function (dueDate) {
        const { invoice_date: invoiceDate } = this.parent;
        if (!invoiceDate || !dueDate) return true;
        return new Date(dueDate) >= new Date(invoiceDate);
      }
    ),
  invoice_amount: Yup.string().required('Invoice amount is required'),
  invoice: Yup.mixed().required('Invoice is required'),
  // payment_status: Yup.string().required('Required'),
});
export const uploadOthInvoiceFormSchema = Yup.object({
  invoice_reference: Yup.string().required('Invoice reference is required'),
  invoice_date: Yup.string().required('Invoice date is required'),
  due_date: Yup.string()
    .required('Due date is required')
    .test(
      'is-greater',
      'Due date must be greater than invoice date',
      function (dueDate) {
        const { invoice_date: invoiceDate } = this.parent;
        if (!invoiceDate || !dueDate) return true; // If any date is missing, skip validation
        return new Date(dueDate) >= new Date(invoiceDate);
      }
    ),
  invoice_amount: Yup.string().required('Invoice amount is required'),
  invoice: Yup.mixed().required('Invoice is required'),
  // payment_status: Yup.string().required('Required'),
});
